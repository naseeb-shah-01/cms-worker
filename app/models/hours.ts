
import mongoose, { Schema, Document } from 'mongoose';

export interface IHour extends Document {
  user: mongoose.Types.ObjectId;
  openTime: string;
  closeTime: string;
  remark: string;
  createdAt: Date;
  updatedAt: Date;
}

const HourSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  openTime: {
    type: Date,
    required: true,
  },
  closeTime: {
    type: Date,
    
  },
  remark: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose?.models?.Hour || mongoose.model<IHour>('Hour', HourSchema);