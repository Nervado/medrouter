import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  NotAcceptableException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ExamDto } from './dto/exam.dto';
import { Exam } from './models/exam.entity';
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service';
import { User } from 'src/users/models/user.entity';
import { ExamStatus } from './enums/status.enum';
import { SearchClientDto } from 'src/client/dtos/search-client-dto';
import { generatePass } from 'src/utils/hash-pass';
import { Role } from 'src/auth/enums/role.enum';
import { ExamStatusDto } from './dto/exam-status.dto';
import { LabsService } from 'src/labs/labs.service';
import { ClientDto } from 'src/client/dtos/cliente-dto';
import { Client } from 'src/client/models/client.entity';
import { DocsService } from 'src/docs/docs.service';
import { PhotosService } from 'src/photos/photos.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationTopics } from 'src/notifications/enums/notificaiton-topic.enum';
import fmrt from 'src/utils/format-text';

@Injectable()
export class ExamsService {
  constructor(
    private ps: PrescriptionsService,
    private ls: LabsService,
    private ds: DocsService,
    private fs: PhotosService,
    private ns: NotificationsService,
  ) {}

  async create(examdto: ExamDto, user: User): Promise<void> {
    const prescription = await this.ps.findById(examdto.prescriptionId);

    if (!prescription) {
      throw new BadRequestException('Prescription not exists!');
    }

    if (user.userId !== prescription.doctor.user.userId) {
      throw new UnauthorizedException('Not allowed');
    }

    const exam = new Exam();

    exam.prescription = prescription;
    exam.client = prescription.client;
    exam.doctor = prescription.doctor;
    exam.code = generatePass();

    Exam.merge(exam, examdto);

    try {
      await exam.save();
    } catch (error) {
      throw new InternalServerErrorException('Creation of exam has fail');
    }

    //notify exam request
    await this.ns.create({
      receiver: exam.client.user.userId,
      date: new Date(),
      read: false,
      topic: NotificationTopics.EXAMS,
      message: `O doutor ${
        exam.doctor.user.username
      } solictou um exame de ${fmrt(exam.type)}`,
    });
  }

  async delete(id: string): Promise<void> {
    const exam = await Exam.findOne(id);

    if (exam.status !== ExamStatus.REQUEST) {
      throw new BadRequestException('Exam cannot be canceled');
    }

    exam.status = ExamStatus.CANCELED;
    exam.code = null;
    exam.deadline = 0;

    try {
      await exam.save();
    } catch (error) {
      throw new InternalServerErrorException('fail to cancel exam');
    }
  }

  async getAll(
    id: string,
    search: SearchClientDto,
    user?: User,
    labId?: string,
  ): Promise<ExamDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Exam.createQueryBuilder('exam');

    if (id) {
      query.andWhere('doctor.id = :id', { id: id });
    }

    if (user?.userId && !user) {
      query.andWhere('clientUser.userId = :userId', { userId: user.userId });
    }

    if (labId && user.role.find(role => role === Role.LAB)) {
      query.andWhere('lab.id = :labId', { labId });
    }

    // query.andWhere('status <> :status', { status: ExamStatus.CANCELED });

    if (username) {
      query.andWhere(
        `clientUser.username ILIKE '%${username}%' OR  clientUser.surname ILIKE '%${username}%' `,
      );
    }

    const founds = await query
      .leftJoinAndSelect('exam.doctor', 'doctor')
      .leftJoinAndSelect('exam.docs', 'docs')
      .leftJoinAndSelect('exam.photos', 'photos')
      .leftJoinAndSelect('exam.lab', 'lab')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
      .leftJoinAndSelect('exam.client', 'client')
      .leftJoinAndSelect('client.user', 'clientUser')
      .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
      .orderBy('exam.createdAt', 'DESC')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return [
      ...new Set(
        founds.map((exam: Exam) =>
          this.serializeExam(
            exam,
            user?.userId === exam.client.user.userId,
            exam.status === ExamStatus.CONCLUDED,
          ),
        ),
      ),
    ];
  }

  serializeExam(exam: Exam, sendCode?: boolean, sendResult?: boolean): ExamDto {
    return {
      id: exam?.id,
      code: sendCode ? exam.code : null,
      price: exam.price,
      status: exam.status,
      deadline: exam.deadline,
      type: exam.type,
      docs: exam.docs.map(doc => {
        return { url: doc.url, id: doc.id };
      }),
      photos: exam.photos.map(photo => {
        return { url: photo.url, id: photo.id };
      }),
      createdAt: exam.createdAt,
      lab: {
        id: exam.lab?.id,
        name: exam.lab?.name,
        cnpj: exam.lab?.cnpj,
        available: exam.lab?.available,
        labcategory: exam.lab?.labcategory,
        exams: exam.lab?.exams,
      },

      client: {
        id: exam.client.id,
        user: {
          username: exam.client.user.username,
          fullname: exam.client.user.fullname,
          surname: exam.client.user.surname,
          avatar: {
            url: exam.client.user.avatar?.url,
          },
        },
      },
      doctor: {
        id: exam.doctor.id,
        user: {
          username: exam.doctor.user.username,
          fullname: exam.doctor.user.fullname,
          surname: exam.doctor.user.surname,
          avatar: {
            url: exam.doctor.user.avatar?.url,
          },
        },
      },
    };
  }

  async change(examId): Promise<void> {
    const exam = await Exam.findOne(examId);

    if (!exam) {
      throw new BadRequestException('Exam dont exist!');
    }

    if (exam.status !== ExamStatus.CONCLUDED) {
      throw new BadRequestException('Exam cannot be send!');
    }

    exam.status = ExamStatus.AVAILABLE;

    try {
      await exam.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail to send Exam');
    }
  }

  async reduceDeadlineExams(): Promise<number> {
    const query = Exam.createQueryBuilder('exam');

    query.andWhere('status = :status', { status: ExamStatus.EXECUTION });

    const founds = await query.getMany();

    founds.map(async exam => {
      exam.deadline = exam.deadline > 0 ? exam.deadline - 1 : 0;

      try {
        await exam.save();
      } catch (error) {
        throw new InternalServerErrorException(
          'Fail at update deadline count at exam',
          exam.id,
        );
      }
    });

    return founds.length;
  }

  async changeStatus(
    id: string,
    statusDto: ExamStatusDto,
    user: User,
  ): Promise<void> {
    const exam = await Exam.findOne(id);

    const { code, status, labId } = statusDto;

    if (!exam) {
      throw new BadRequestException('Exam dont exists');
    }

    if (
      labId &&
      code &&
      code === exam.code &&
      status === ExamStatus.EXECUTION &&
      exam.status === ExamStatus.REQUEST
    ) {
      const lab = await this.ls.getOne(labId, user);

      if (!lab) {
        throw new NotFoundException('Lab not found');
      }

      if (!lab.exams.find(type => type === exam.type)) {
        throw new BadRequestException('Lab not able to exec');
      }

      exam.lab = lab;
      exam.status = ExamStatus.EXECUTION;
      exam.price = statusDto.price;
      exam.deadline = statusDto.deadline;
      exam.code = null;

      // to do notify
    }

    if (
      status === ExamStatus.CANCELED &&
      exam.status === ExamStatus.EXECUTION &&
      exam.docs.length === 0 &&
      exam.photos.length === 0
    ) {
      exam.status = ExamStatus.REQUEST;
      exam.deadline = null;
      exam.price = null;
      exam.lab = null;
      exam.code = generatePass();
      // todo notify
    }

    if (
      status === ExamStatus.CONCLUDED &&
      exam.status === ExamStatus.EXECUTION &&
      (exam.docs.length > 0 || exam.photos.length > 0)
    ) {
      exam.status = ExamStatus.CONCLUDED;
      exam.code = null;
    }
    //

    if (
      status === ExamStatus.CONCLUDED &&
      exam.status === ExamStatus.EXECUTION &&
      exam.docs.length === 0 &&
      exam.photos.length === 0
    ) {
      throw new BadRequestException('Exam dot have any result');
    }

    if (
      status === ExamStatus.CANCELED &&
      (exam.status === ExamStatus.CONCLUDED ||
        exam.status === ExamStatus.AVAILABLE) &&
      (exam.docs.length > 0 || exam.photos.length > 0)
    ) {
      throw new BadRequestException('Exam cannot be deleted anymore');
    }

    if (
      status === ExamStatus.CANCELED &&
      exam.status === ExamStatus.EXECUTION &&
      (exam.docs.length > 0 || exam.photos.length > 0)
    ) {
      throw new BadRequestException('Exam has result');
    }

    try {
      await exam.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail at modify exam status ');
    }
  }

  async getOne(code: string): Promise<ExamDto> {
    const exam = await Exam.findOne({ where: { code } });

    if (!exam) {
      throw new BadRequestException('Exam not found');
    }

    return this.serializeExam(exam);
  }

  serializeLabClient(client: Client): ClientDto {
    return {
      username: client.user.username,
      email: client.user.email,
      id: client.id,
      user: {
        username: client.user.username,
        fullname: client.user.fullname,
        surname: client.user.surname,
        avatar: {
          url: client.user.avatar?.url,
        },
      },
    };
  }

  async getClientsWithRelatedExam(
    id: string,
    search: SearchClientDto,
  ): Promise<ClientDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Exam.createQueryBuilder('exam');

    query.andWhere('lab.id = :id ', { id });

    if (username) {
      query.andWhere(
        `user.username  ILIKE '%${username}%' OR user.surname  ILIKE '%${username}%'`,
      );
    }

    const founds = await query
      .leftJoinAndSelect('exam.lab', 'lab')
      .leftJoinAndSelect('exam.client', 'client')
      .leftJoinAndSelect('client.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(10)
      .getMany();

    const ids = founds.map(exam => exam.client.id);

    const uniqIds = [...new Set([...ids])];

    const clients = [
      ...uniqIds.map(id => founds.find(exam => exam.client.id === id)),
    ].map(cl => this.serializeLabClient(cl.client));

    return clients;
  }

  async update(id: string, examDto: ExamDto, user: User): Promise<void> {
    const { docs, photos } = examDto;

    const exam = await Exam.findOne(id);

    if (!exam) {
      throw new NotFoundException('Exam dont exist');
    }

    if (!exam.lab.users.find(_user => _user.userId === user.userId)) {
      throw new UnauthorizedException('User is not employee');
    }

    if (docs.length > 0) {
      const doc = await this.ds.getOne(docs[0].id);

      exam.docs = [...exam.docs, doc];
    }

    if (photos.length > 0) {
      const photo = await this.fs.getOne(photos[0].id);

      exam.photos = [...exam.photos, photo];
    }

    try {
      await exam.save();
    } catch (error) {
      throw new InternalServerErrorException('Update exam results has fail');
    }
  }
}
