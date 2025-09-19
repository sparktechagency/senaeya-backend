import { Schema, model } from 'mongoose';
import { IworkShop } from './workShop.interface';

const WorkShopSchema = new Schema<IworkShop>({
     image: { type: String, required: true },
     title: { type: String,required: true },
     description: { type: String,required: true },
     isDeleted: { type: Boolean, default: false },
     deletedAt: { type: Date },
}, { timestamps: true });

WorkShopSchema.pre('find', function (next) {
     this.find({ isDeleted: false });
     next();
});

WorkShopSchema.pre('findOne', function (next) {
     this.findOne({ isDeleted: false });
     next();
});

WorkShopSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});       

export const WorkShop = model<IworkShop>('WorkShop', WorkShopSchema);
