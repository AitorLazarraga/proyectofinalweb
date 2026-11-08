export interface User {
    _id?: string;
    username: string;
    email: string;
    latitude: number;
    longitude: number;
}

export interface LoginResponse {
    access_token: string;
    user: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    latitude: number;
    longitude: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}