// interfaces.ts
import { Method } from "axios";

/* ============================
   ⚙️ SDK CONFIGURATION
   ============================ */
export interface NeuctraAuthixConfig {
  /** Base URL of the Authix API (required) */
  baseUrl: string;
  /** API key for authentication */
  apiKey: string;
  /** App ID for scoping user operations */
  appId: string;
}

/* ============================
   👤 USER AUTH INTERFACES
   ============================ */
export interface SignupParams {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  address?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  role?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface UpdateUserParams {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string | null;
  address?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  role?: string;
}

export interface ChangePasswordParams {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface DeleteUserParams {
  userId: string;
}

export interface GetProfileParams {
  /** JWT access token */
  token: string;
}

export interface CheckUserResponse {
  success: boolean;
  exists: boolean;
}

export interface CheckSessionResponse {
  authenticated: boolean;
  user?: Record<string, any>;
}

/* ============================
   📂 USER EXTRA DATA
   ============================ */
export interface GetUserDataParams {
  userId: string;
}

export interface GetSingleUserDataParams {
  userId: string;
  dataId: string;
}

export interface AddUserDataParams {
  userId: string;
  dataCategory: string;
  /** Object to add */
  data: Record<string, any>;
}

export interface UpdateUserDataParams {
  userId: string;
  dataId: string;
  /** Fields to update */
  data: Record<string, any>;
}

export interface DeleteUserDataParams {
  userId: string;
  dataId: string;
}

/* ============================
   📦 APP DATA
   ============================ */
export interface AppDataItem {
  id: string;
  [key: string]: any;
}

export interface AddAppDataParams {
  data: Record<string, any>;
}

export interface UpdateAppDataParams {
  dataId: string;
  data: Record<string, any>;
}

export interface DeleteAppDataParams {
  dataId: string;
}

/* ============================
   🌐 GENERIC REQUEST
   ============================ */
export interface SDKRequestOptions<D = any> {
  method: Method;
  path: string;
  data?: D;
  extraHeaders?: Record<string, string>;
}
