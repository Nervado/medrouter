import { Component } from "@angular/core";
import { faFileMedicalAlt } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "src/app/messages/toast/enums/colors";
import { NotificationService } from "src/app/messages/notification.service";
import { LaboratoriesService } from "../../laboratories.service";
import { ExamDto } from "src/app/clients/models/exam";
import { Types } from "src/app/messages/toast/enums/types";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamStatusDto } from "../../dtos/exam-status.dto";
import { ExamStatus } from "../../enums/status.enum";

@Component({
  selector: "app-seach-edit-exam",
  templateUrl: "./seach-edit-exam.component.html",
  styleUrls: ["./seach-edit-exam.component.scss"],
})
export class SeachEditExamComponent {
  faFileMedicalAlt = faFileMedicalAlt;

  mainColor: Colors = Colors.LAB;
  exam: ExamDto;

  constructor(
    private ns: NotificationService,
    private ls: LaboratoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  confirm(examDto: ExamStatusDto) {
    this.ls
      .changeStatus(examDto.id, { ...examDto, status: ExamStatus.EXECUTION })
      .subscribe({
        next: () => {
          this.ns.notify({
            message: "Análise em execução",
            type: Types.SUCCESS,
          });
          this.router.navigate(["laboratories", examDto.labId, "exams"]);
        },
        error: () => {
          this.ns.notify({
            message: "Falha ao autorizar exame",
            type: Types.ERROR,
          });
        },
      });
  }

  showModal(modal, code: string) {
    this.ls.getByCode(code).subscribe({
      next: (exam: ExamDto) => {
        this.exam = exam;
        this.exam.code = code;
        this.exam.lab.id = this.activatedRoute.parent.snapshot.params["id"];
        modal.open();
      },
      error: () =>
        this.ns.notify({
          message: "Exame não encontrado ou não autorizado",
          type: Types.WARN,
        }),
    });
  }
}
