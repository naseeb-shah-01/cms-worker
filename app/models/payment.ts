
import mongoose, { Schema, Document } from 'mongoose';

export interface IPay extends Document {
  user: mongoose.Types.ObjectId;
  admin: mongoose.Types.ObjectId;
  
  amount: number;
  remark: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount:{
    type: Number,
    required: true,
  },
  remark: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose?.models?.Pay || mongoose.model<IPay>('Pay',PaymentSchema); 