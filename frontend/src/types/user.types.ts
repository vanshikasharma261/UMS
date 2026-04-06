export interface UserResponse {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    gender: string,
    street: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
}


export interface UserState {
    loading: boolean,
    error: string | null,
    users: UserResponse[] | null,
    selectedUser: UserResponse | null,
    formError: string | null
}

export interface UserErrorResponse {
    statusCode?: number,
    message: string,
    error?: string
}

export interface CreateUser {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    street: string,
    city: string,
    state: string,
    country: string,
    zipCode: string,
    password: string
}

export interface EditUser {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string
}



