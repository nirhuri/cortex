import { apiClient } from "@/lib/api/client";
import {
  LoginDto,
  LoginResponseDto,
  SignupDto,
  SignupResponseDto,
} from "@/types/auth.dto";

export const login = async (data: LoginDto): Promise<LoginResponseDto> => {
  const response = await apiClient.post("/auth/login", data);
  return {
    accessToken: response.data.data.accessToken,
  };
};

export const signup = async (data: SignupDto): Promise<SignupResponseDto> => {
  const response = await apiClient.post("/auth/signup", data);
  return {
    accessToken: response.data.data.accessToken,
  };
};
