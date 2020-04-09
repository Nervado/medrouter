import { PipeTransform, BadRequestException } from '@nestjs/common';
import { EmailTopic } from '../enums/email-topic';

export class EmailTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = [
    EmailTopic.BUDGETS,
    EmailTopic.COMPLAINT,
    EmailTopic.FINANCIAL,
    EmailTopic.GENERAL,
  ];

  transform(value: any) {
    const data = value;
    value = value.type.toUpperCase();
    console.log(value);

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid type`);
    }
    data.type = value;

    return data;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedTypes.indexOf(status);
    return idx !== -1;
  }
}
