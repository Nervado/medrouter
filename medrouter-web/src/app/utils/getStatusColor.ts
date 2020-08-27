import { Colors } from "../messages/toast/enums/colors";
import { ExamStatus } from "../clients/enums/status.enum";

export default function getStatusColor(status: ExamStatus): Colors {
  switch (status) {
    case ExamStatus.AVAILABLE:
      return Colors.RECEPT;
    case ExamStatus.CANCELED:
      return Colors.ERROR;
    case ExamStatus.CONCLUDED:
      return Colors.SUCCESS;
    case ExamStatus.EXECUTION:
      return Colors.INFO;
    case ExamStatus.REQUEST:
      return Colors.WARN;
    default:
      return Colors.BASE;
  }
}
