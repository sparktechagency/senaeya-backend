import { Schema, model } from 'mongoose';
import { IcarBrand } from './carBrand.interface';

const CarBrandSchema = new Schema<IcarBrand>(
     {
          image: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: false },
          country: { type: Schema.Types.ObjectId, ref: 'CarBrandCountries', required: true },
          isDeleted: { type: Boolean, default: false },
          deletedAt: { type: Date },
     },
     { timestamps: true },
);

CarBrandSchema.pre('find', function (next) {
     this.find({ isDeleted: false });
     next();
});

CarBrandSchema.pre('findOne', function (next) {
     this.findOne({ isDeleted: false });
     next();
});

CarBrandSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});

export const CarBrand = model<IcarBrand>('CarBrand', CarBrandSchema);
