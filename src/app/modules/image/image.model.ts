import { Schema, model } from 'mongoose';
import { Iimage } from './image.interface';
import { ImageType } from './image.enum';

const ImageSchema = new Schema<Iimage>({
     image: { type: String, required: true },
     title: { type: String,required: false },
     type: { type: String, enum: Object.values(ImageType), required: true },
     description: { type: String,required: false },
     isDeleted: { type: Boolean, default: false },
     deletedAt: { type: Date },
}, { timestamps: true });

ImageSchema.pre('find', function (next) {
     this.find({ isDeleted: false });
     next();
});

ImageSchema.pre('findOne', function (next) {
     this.findOne({ isDeleted: false });
     next();
});

ImageSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});       

export const Image = model<Iimage>('Image', ImageSchema);
