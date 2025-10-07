import { Schema, model } from 'mongoose';
import { IworksCategories } from './worksCategories.interface';

const WorksCategoriesSchema = new Schema<IworksCategories>({
     image: { type: String, required: true },
     title: { type: String,required: true },
     description: { type: String,required: true },
     isDeleted: { type: Boolean, default: false },
     deletedAt: { type: Date },
}, { timestamps: true });

WorksCategoriesSchema.pre('find', function (next) {
     this.find({ isDeleted: false });
     next();
});

WorksCategoriesSchema.pre('findOne', function (next) {
     this.findOne({ isDeleted: false });
     next();
});

WorksCategoriesSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});       

export const WorksCategories = model<IworksCategories>('WorksCategories', WorksCategoriesSchema);
