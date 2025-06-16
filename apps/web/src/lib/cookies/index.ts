'use server';

import { cookies } from 'next/headers';

type CookieOptions = {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    path?: string;
    maxAge?: number;
};

export async function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
) {
    (await cookies()).set({
        name,
        value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        ...options,
    });
}

export async function getCookie(name: string): Promise<string | undefined> {
    return (await cookies()).get(name)?.value;
}

export async function deleteCookie(name: string) {
    (await cookies()).delete(name);
}