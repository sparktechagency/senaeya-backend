import { Document, Types } from 'mongoose';

// Define the interface for your settings
export interface ISettings extends Document {
     providerWorkShopId?: Types.ObjectId | null; // null is for app settings and not null is for specific provider settings
     vat?: number; // for specific provider settings it not for app settings
     // for app ⬇️⬇️⬇️
     privacyPolicy: string;
     aboutUs: string;
     support: string;
     termsOfService: string;
}
