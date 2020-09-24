export interface MessageDto {
  _id?: string;
  sender?: string;
  receiver?: string;
  message?: string;
  left?: boolean;
  date?: Date;
  read?: boolean;
}
