import { Schema, model } from 'mongoose';
import { Iinvoice } from './invoice.interface';

const InvoiceSchema = new Schema<Iinvoice>({
     client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
     providerWorkShopId: { type: Schema.Types.ObjectId, ref: 'WorkShop', required: true },
     image: { type: String, required: true },
     title: { type: String,required: true },
     description: { type: String,required: true },
     isDeleted: { type: Boolean, default: false },
     deletedAt: { type: Date },
}, { timestamps: true });

InvoiceSchema.pre('find', function (next) {
     this.find({ isDeleted: false });
     next();
});

InvoiceSchema.pre('findOne', function (next) {
     this.findOne({ isDeleted: false });
     next();
});

InvoiceSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});       

export const Invoice = model<Iinvoice>('Invoice', InvoiceSchema);
