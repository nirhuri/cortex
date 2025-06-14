export interface IPasswordService {
    hashPassword(password: string): Promise<string>;
    compare(raw: string, hash: string): Promise<boolean>;
}