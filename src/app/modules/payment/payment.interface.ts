import { Types } from "mongoose";
import { PaymentMethod } from "./payment.enum";
import { PaymentStatus } from "twilio/lib/rest/api/v2010/account/call/payment";

export interface Ipayment {
     providerWorkShopId: Types.ObjectId;
     invoiceId: Types.ObjectId;
     paymentMethod: PaymentMethod;
     paymentStatus: PaymentStatus;
     amount: number;
     isCashRecieved?: boolean | null; // for cash payment
     cardApprovalCode?: string | null; // for card payment
     isRecievedTransfer?: boolean | null; // for transfer payment
     postPaymentDate?: Date | null; // for postpaid payment
     createdAt: Date;
     updatedAt: Date;
     isDeleted: boolean;
     deletedAt?: Date;
}

export type IpaymentFilters = {
     searchTerm?: string;
};
