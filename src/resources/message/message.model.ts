import { Schema, model } from 'mongoose';

import Message from '@/resources/message/message.interface';

const MessageSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Message>('Message', MessageSchema);
