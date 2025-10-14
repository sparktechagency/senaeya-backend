import { IInvoice } from "../app/modules/invoice/invoice.interface"

const createAccount = (values: {name:string,otp:number,contact:string}) => {
     return `Hello ${values.name},
     Your single use code is: ${values.otp}
     This code is valid for 3 minutes.
     `
}

const forgetPassword = (values: {name:string,password:string,contact:string}) => {
     return `Hello ${values.name},
     Your password is: ${values.password}
     `
}



const createInvoice = (updatedInvoice : IInvoice) => {
     console.log("🚀 ~ createInvoice ~ updatedInvoice:", updatedInvoice)
     return `
     <!DOCTYPE html>
     <html lang="ar" dir="rtl">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Invoice Report - فاتورة ضريبية مبسطة</title>
         <style>
             * {
                 margin: 0;
                 padding: 0;
                 box-sizing: border-box;
             }
 
             body {
                 font-family: Arial, sans-serif;
                 background-color: #f3f3f3;
                 padding: 20px;
             }
 
             .invoice-container {
                 max-width: 800px;
                 margin: 0 auto;
                 background-color: #ffffff;
                 padding: 30px;
             }
 
             /* Header Section */
             .header {
                 display: flex;
                 justify-content: space-between;
                 align-items: flex-start;
                 margin-bottom: 20px;
             }
 
             .header-left {
                 display: flex;
                 gap: 15px;
                 align-items: flex-start;
             }
 
             .logo {
                 width: 80px;
                 height: 80px;
             }
 
             .qr-code {
                 width: 80px;
                 height: 80px;
                 border: 1px solid #000;
             }
 
             .header-right {
                 text-align: right;
             }
 
             .company-name {
                 font-size: 20px;
                 font-weight: bold;
                 margin-bottom: 5px;
             }
 
             .company-subtitle {
                 font-size: 12px;
                 margin-bottom: 3px;
             }
 
             .company-details {
                 font-size: 11px;
                 line-height: 1.6;
             }
 
             /* Invoice Info Section */
             .invoice-info {
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 margin-bottom: 20px;
                 padding-bottom: 15px;
                 border-bottom: 1px solid #ddd;
             }
 
             .invoice-left {
                 text-align: left;
             }
 
             .invoice-label {
                 font-size: 11px;
                 color: #666;
             }
 
             .invoice-value {
                 font-size: 12px;
                 color: #cb3c40;
                 font-weight: bold;
             }
 
             .invoice-center {
                 text-align: center;
             }
 
             .simplified-label {
                 font-size: 10px;
                 color: #666;
                 margin-bottom: 3px;
             }
 
             .invoice-title {
                 font-size: 16px;
                 font-weight: bold;
                 margin-bottom: 8px;
             }
 
             .payment-type {
                 font-size: 13px;
                 color: #cb3c40;
                 font-weight: bold;
             }
 
             .invoice-right {
                 text-align: right;
             }
 
             .license-box {
                 border: 2px solid #000;
                 padding: 8px 12px;
                 display: inline-block;
                 text-align: center;
             }
 
             .license-number {
                 font-size: 18px;
                 font-weight: bold;
                 margin-bottom: 5px;
             }
 
             .license-details {
                 display: flex;
                 gap: 10px;
                 border-top: 1px solid #000;
                 padding-top: 5px;
             }
 
             .license-cell {
                 text-align: center;
                 font-size: 14px;
                 font-weight: bold;
             }
 
             .license-divider {
                 width: 1px;
                 background-color: #000;
             }
 
             .license-arabic {
                 writing-mode: vertical-rl;
                 text-orientation: mixed;
                 font-size: 12px;
             }
 
             /* Vehicle Section */
             .vehicle-section {
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 margin-bottom: 20px;
                 padding: 15px 0;
                 border-bottom: 1px solid #ddd;
             }
 
             .vehicle-left {
                 display: flex;
                 align-items: center;
                 gap: 20px;
             }
 
             .toyota-logo {
                 width: 50px;
                 height: 50px;
             }
 
             .vehicle-info {
                 display: flex;
                 gap: 30px;
                 font-size: 18px;
                 font-weight: bold;
             }
 
             .vehicle-right {
                 display: flex;
                 gap: 30px;
                 font-size: 11px;
             }
 
             .vehicle-detail {
                 text-align: right;
             }
 
             .vehicle-detail-label {
                 color: #666;
             }
 
             .vehicle-detail-value {
                 font-weight: bold;
             }
 
             /* Tables */
             .table-container {
                 margin-bottom: 30px;
             }
 
             table {
                 width: 100%;
                 border-collapse: collapse;
             }
 
             thead {
                 background-color: #1771b7;
                 color: #ffffff;
             }
 
             th {
                 padding: 10px;
                 text-align: center;
                 font-size: 13px;
                 font-weight: bold;
                 border: 1px solid #1771b7;
             }
 
             tbody tr {
                 background-color: #eeeeee;
                 height: 40px;
             }
 
             tbody tr:nth-child(even) {
                 background-color: #f8f8f8;
             }
 
             td {
                 padding: 10px;
                 text-align: center;
                 font-size: 12px;
                 border: 1px solid #ddd;
             }
 
             .summary-section {
                 flex: 1;
             }
 
             .summary-row {
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 margin-bottom: 8px;
                 border: 1px solid #ddd;
             }
 
             .summary-label {
                 background-color: #cb3c40;
                 color: #ffffff;
                 padding: 8px 15px;
                 font-size: 12px;
                 flex: 1;
                 text-align: center;
             }
 
             .summary-value {
                 background-color: #ffffff;
                 padding: 8px 15px;
                 font-size: 12px;
                 flex: 1;
                 text-align: center;
                 font-weight: bold;
             }
 
             .total-row .summary-label {
                 background-color: #1771b7;
             }
 
             /* Bottom Bar */
             .bottom-bar {
                 margin-top: 30px;
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 background-color: #1771b7;
                 padding: 15px 20px;
                 color: #ffffff;
             }
 
             .thank-you {
                 font-size: 12px;
                 line-height: 1.5;
             }
 
             .contact-bar {
                 background-color: #cb3c40;
                 padding: 10px 20px;
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 color: #ffffff;
                 font-size: 12px;
             }
 
             .phone-number {
                 background-color: #cb3c40;
                 padding: 8px 16px;
                 border-radius: 4px;
                 font-weight: 700;
             }
 
             .location {
                 font-weight: 600;
             }
         </style>
     </head>
     <body>
         <div class="invoice-container">
             <div class="header">
                 <div class="header-left">
                     <svg class="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                         <circle cx="50" cy="35" r="15" fill="none" stroke="#f4c430" stroke-width="4"/>
                         <circle cx="50" cy="35" r="8" fill="none" stroke="#f4c430" stroke-width="3"/>
                     </svg>
                     <div class="qr-code">
                         <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                             <rect width="100" height="100" fill="#fff"/>
                             <rect x="5" y="5" width="25" height="25" fill="#000"/>
                         </svg>
                     </div>
                 </div>
                 <div class="header-right">
                     <div class="company-name">مركز محمد لصيانة السيارات</div>
                     <div class="company-subtitle">مؤسسة محمد علي التجارية</div>
                     <div class="company-details">
                         <div>سجل تجاري <span style="margin-left: 10px;">CR No.</span></div>
                         <div>رقم الضريبي <span style="margin-left: 10px;">VAT No.</span></div>
                     </div>
                 </div>
             </div>
 
             <div class="invoice-info">
                 <div class="invoice-left">
                     <div>
                         <span class="invoice-label">Invoice No.</span>
                         <div class="invoice-value">${updatedInvoice._id || ''}</div>
                     </div>
                     <div style="margin-top: 10px;">
                         <span class="invoice-label">Invoice Date</span>
                         <div class="invoice-value">${new Date(updatedInvoice.createdAt).toLocaleDateString() || ''}</div>
                     </div>
                 </div>
                 <div class="invoice-center">
                     <div class="simplified-label">فاتورة ضريبية مبسطة</div>
                     <div class="invoice-title">Simplified Tax Invoice</div>
                     <div class="payment-type">${updatedInvoice.paymentMethod || ''}</div>
                 </div>
                 <div class="invoice-right">
                     <div class="license-box">
                         <div class="license-number">KW-695048</div>
                     </div>
                 </div>
             </div>
 
             <!-- Vehicle Section -->
             <div class="vehicle-section">
                 <div class="vehicle-left">
                     <div class="vehicle-info">
                         <span>Car Model</span>
                         <span>2020</span>
                     </div>
                 </div>
                 <div class="vehicle-right">
                     <div class="vehicle-detail">
                         <div class="vehicle-detail-label">Client</div>
                         <div class="vehicle-detail-value">${updatedInvoice.client || ''}</div>
                     </div>
                 </div>
             </div>
 
             <!-- Works Table -->
             <div class="table-container">
                 <table>
                     <thead>
                         <tr>
                             <th>N</th>
                             <th>Code</th>
                             <th>Works</th>
                             <th>Quantity</th>
                             <th>Price</th>
                             <th>Total</th>
                         </tr>
                     </thead>
                     <tbody>
                         ${updatedInvoice.worksList ? updatedInvoice.worksList.map((work:any, index:any) => `
                             <tr>
                                 <td>${index + 1}</td>
                                 <td>${work._id}</td>
                                 <td>${work.work}</td>
                                 <td>${work.quantity}</td>
                                 <td>${work.finalCost}</td>
                                 <td>${work.finalCost * work.quantity}</td>
                             </tr>
                         `).join('') : ''}
                     </tbody>
                 </table>
             </div>
 
             <!-- Spare Parts Table -->
             <div class="table-container">
                 <table>
                     <thead>
                         <tr>
                             <th>N</th>
                             <th>Code</th>
                             <th>Spare Parts</th>
                             <th>Quantity</th>
                             <th>Price</th>
                             <th>Total</th>
                         </tr>
                     </thead>
                     <tbody>
                         ${updatedInvoice.sparePartsList ? updatedInvoice.sparePartsList.map((part:any, index:any) => `
                             <tr>
                                 <td>${index + 1}</td>
                                 <td>${part._id}</td>
                                 <td>${part.work}</td>
                                 <td>${part.quantity}</td>
                                 <td>${part.finalCost}</td>
                                 <td>${part.finalCost * part.quantity}</td>
                             </tr>
                         `).join('') : ''}
                     </tbody>
                 </table>
             </div>
 
             <!-- Summary Section -->
             <div class="summary-section">
                 <div class="summary-row total">
                     <div class="summary-label">Total Cost</div>
                     <div class="summary-value">${updatedInvoice.totalCostIncludingTax || ''}</div>
                 </div>
                 <div class="summary-row">
                     <div class="summary-label">Tax</div>
                     <div class="summary-value">${updatedInvoice.taxAmount || ''}</div>
                 </div>
                 <div class="summary-row">
                     <div class="summary-label">Discount</div>
                     <div class="summary-value">${updatedInvoice.finalDiscountInFlatAmount || ''}</div>
                 </div>
                 <div class="summary-row">
                     <div class="summary-label">Total After Discount</div>
                     <div class="summary-value">${updatedInvoice.finalCost || ''}</div>
                 </div>
             </div>
 
             <!-- Footer Section -->
             <div class="footer">
                 <div class="footer-left">
                     You can issue multiple reports via Senaeya App. Daily - Weekly - Monthly - Annual Report.
                 </div>
                 <div class="footer-right">
                     <span class="phone-number">966-5xxxxxxxx</span>
                 </div>
             </div>
         </div>
     </body>
     </html>
     `;
 };
 

export const whatsAppTemplate = {
    createAccount,
    forgetPassword,
    createInvoice,
    // resetPassword,
    // resetPasswordByUrl,
    // contactFormTemplate,
    // contact,
};