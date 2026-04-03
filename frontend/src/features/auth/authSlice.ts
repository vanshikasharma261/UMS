import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type {
    AuthState,
    LoginCredentials,
    LoginResponse,
    LoginErrorResponse,
} from "../../types/auth.types"


const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginCredentials,
    { rejectValue: LoginErrorResponse }
>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            })

            if (!response.ok) {
                const err: LoginErrorResponse = await response.json()
                return rejectWithValue(err)
            }

            const data: LoginResponse = await response.json()
            localStorage.setItem("token", data.access_token)
            return data

        } catch {
            return rejectWithValue({
                statusCode: 500,
                message: "Network error. Please try again.",
            })
        }
    }
)

const initialState: AuthState = {
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null
            state.error = null
            localStorage.removeItem("token")
        },
        clearError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.token = action.payload.access_token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                const message = action.payload?.message
                state.error = Array.isArray(message)
                    ? message.join(", ")
                    : message ?? "Something went wrong"
            })
    },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer