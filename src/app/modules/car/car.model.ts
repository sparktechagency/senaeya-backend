import { Schema, model } from 'mongoose';
import { Icar } from './car.interface';
import { CLIENT_CAR_TYPE } from '../client/client.enum';
const CarSchema = new Schema<Icar>(
     {
          brand: { type: Schema.Types.ObjectId, ref: 'CarBrand', required: true },
          model: { type: String, required: true },
          year: { type: String, required: true },
          vin: { type: String, required: true, unique: true },
          client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
          image: { type: String, required: false },
          description: { type: String, required: false },
          carType: { type: String, enum: CLIENT_CAR_TYPE, required: true},
          plateNumberForInternational: { type: String, required: false, unique: true },
          plateNumberForSaudi: {
               type: {
                    symbol: { type: String, required: false },
                    numberEnglish: { type: String, required: false },
                    numberArabic: { type: String, required: false },
                    alphabetsCombinations: { type: [String], required: false },
               },
               required: false,
               unique: true,
          },
          isDeleted: { type: Boolean, default: false },
          deletedAt: { type: Date },
     },
     { timestamps: true },
);

CarSchema.pre('find', function (next) {
     this.find({ isDeleted: false });
     next();
});

CarSchema.pre('findOne', function (next) {
     this.findOne({ isDeleted: false });
     next();
});

CarSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});

export const Car = model<Icar>('Car', CarSchema);
