import { Document } from 'mongoose';

export default interface Message extends Document {
  phone: string;
  text: string;
}
