export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
}

export interface SignupDto {
  email: string;
  password: string;
  fullName: string;
}

export interface SignupResponseDto {
  accessToken: string;
}
