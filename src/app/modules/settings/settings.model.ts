import { Schema, Types, model } from 'mongoose';
import { ISettings } from './settings.interface';

const settingsSchema = new Schema<ISettings>(
     {
          providerWorkShopId: {
               type: Types.ObjectId,
               ref: 'WorkShop',
               default: null, // null for app settings and not null for specific provider settings
               unique: true,
          },
          vat: {
               type: Number,
               default: 0,
          },
          privacyPolicy: {
               type: String,
               default: '',
          },
          aboutUs: {
               type: String,
               default: '',
          },
          support: {
               type: String,
               default: '',
          },
          termsOfService: {
               type: String,
               default: '',
          },
     },
     { timestamps: true },
);

// Create the model
const Settings = model<ISettings>('Settings', settingsSchema);

export default Settings;
