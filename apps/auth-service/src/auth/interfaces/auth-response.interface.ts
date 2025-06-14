export interface IAuthResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}