import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

enum NotificationType {
  Like = 'like',
  Comment = 'comment',
  Follow = 'follow',
}

@Schema({
  timestamps: true,
})
export class NotificationEntity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipient: Types.ObjectId; // Reference to the user receiving the notification

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId; // Reference to the user sending the notification

  @Prop({ type: String, enum: NotificationType, required: true })
  type: NotificationType; // Type of notification (e.g., like, comment, follow)

  @Prop({ type: Types.ObjectId, ref: 'PostEntity' })
  post: Types.ObjectId; // Reference to the post related to the notification (optional)

  @Prop({ default: Date.now })
  createdDate: Date; // Timestamp when the notification was created
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationEntity);
