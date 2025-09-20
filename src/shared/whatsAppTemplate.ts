
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

export const whatsAppTemplate = {
    createAccount,
    forgetPassword,
    // resetPassword,
    // resetPasswordByUrl,
    // contactFormTemplate,
    // contact,
};