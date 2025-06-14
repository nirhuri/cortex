import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;


    @IsNotEmpty({ message: 'Full name is required' })
    @MinLength(2, { message: 'Full name must be at least 2 characters long' })
    fullName!: string;
}