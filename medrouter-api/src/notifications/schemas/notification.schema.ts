import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema({
  name: String,
  type: String,
  userId: Number,
  budgetId: Number,
});
