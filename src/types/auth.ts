export type IVerifyEmail = {
     email: string;
     oneTimeCode: number;
};

export type ILoginData = {
     contact: string;
     password: string;
};

export type IAuthResetPassword = {
     newPassword: string;
     confirmPassword: string;
};

export type IChangePassword = {
     currentPassword: string;
     newPassword: string;
     confirmPassword: string;
};
