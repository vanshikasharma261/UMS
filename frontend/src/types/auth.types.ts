export interface LoginCredentials {
    email: string
    password: string
}

export interface LoginErrorResponse {
    statusCode: number
    message: string | string[]
    error?: string
}

export interface LoginResponse {
    access_token: string
}

export interface AuthState {
    token: string | null
    loading: boolean
    error: string | null
}

export interface token {
    sub: string,
    role: string,
    email: string
}