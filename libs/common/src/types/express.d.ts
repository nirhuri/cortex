declare module 'express' {
    export interface Request {
        user?: { sub: string;[key: string]: any; };
    }
}