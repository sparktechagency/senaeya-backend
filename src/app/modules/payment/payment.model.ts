import { Schema, model } from 'mongoose';
import { Ipayment } from './payment.interface';

const PaymentSchema = new Schema<Ipayment>({
     image: { type: String, required: true },
     title: { type: String,required: true },
     description: { type: String,required: true },
     isDeleted: { type: Boolean, default: false },
     deletedAt: { type: Date },
}, { timestamps: true });

PaymentSchema.pre('find', function (next) {
     this.find({ isDeleted: false });
     next();
});

PaymentSchema.pre('findOne', function (next) {
     this.findOne({ isDeleted: false });
     next();
});

PaymentSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});       

export const Payment = model<Ipayment>('Payment', PaymentSchema);
