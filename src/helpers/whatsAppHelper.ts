import { errorLogger } from '../shared/logger';
import envConfig from './../config/index';
import axios from 'axios';
import qs from 'qs';

interface WhatsAppMessage {
    to: string;
    body: string;
    priority?: number;
    referenceId?: string;
    msgId?: string;
    mentions?: string;
    filename?: string;
    document?: string;
    caption?: string;
}

const sendWhatsAppTextMessage = async (messageData: Partial<WhatsAppMessage>): Promise<any> => {
    try {
        const data = qs.stringify({
            token: envConfig.whatsapp.token,
            to: messageData.to,
            body: messageData.body,
            priority: messageData.priority || 10,
            referenceId: messageData.referenceId || '',
            msgId: messageData.msgId || '',
            mentions: messageData.mentions || '',
        });

        const config = {
            method: 'post',
            url: `https://api.ultramsg.com/${envConfig.whatsapp.instanceId}/messages/chat`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        const response = await axios(config);
        console.log('WhatsApp message sent successfully:', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        errorLogger.error('Error sending WhatsApp message:', error);
        throw error;
    }
};

const sendWhatsAppPDFMessage = async (messageData: Partial<WhatsAppMessage>): Promise<any> => {
    console.log("🚀 ~ sendWhatsAppPDFMessage ~ messageData:", messageData)
    try {
        const data = qs.stringify({
            token: envConfig.whatsapp.token,
            to: messageData.to,
            body: messageData.body,
            filename: messageData.filename,
            document: messageData.document,
            caption: messageData.caption,
            priority: messageData.priority || 10,
            referenceId: messageData.referenceId || '',
            msgId: messageData.msgId || '',
            mentions: messageData.mentions || '',
        });

        const config = {
            method: 'post',
            url: `https://api.ultramsg.com/${envConfig.whatsapp.instanceId}/messages/document`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        const response = await axios(config);
        console.log('WhatsApp message sent successfully:', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        errorLogger.error('Error sending WhatsApp message:', error);
        throw error;
    }
};

const sendWhatsAppForAdmin = async (message: string, adminPhone: string): Promise<any> => {
    try {
        return await sendWhatsAppTextMessage({
            to: adminPhone,
            body: `[ADMIN NOTIFICATION] ${message}`,
            priority: 10,
        });
    } catch (error) {
        errorLogger.error('Error sending WhatsApp message to admin:', error);
        throw error;
    }
};

export const whatsAppHelper = {
    sendWhatsAppTextMessage,
    sendWhatsAppPDFMessage,
    sendWhatsAppForAdmin,
};
