import { Schema, Types, model } from 'mongoose';

export interface IWebsiteLogo {
     providerWorkShopId: Types.ObjectId;
     logo: string;
     status: 'light' | 'dark';
}

const websiteLogoSchema = new Schema<IWebsiteLogo>(
     {
          providerWorkShopId: { type: Schema.Types.ObjectId, ref: 'WorkShop', required: true },
          logo: {
               type: String,
               required: true,
          },
          status: {
               type: String,
               required: true,
          },
     },
     {
          timestamps: true,
     },
);

export const WebsiteLogo = model<IWebsiteLogo>('WebsiteLogo', websiteLogoSchema);
