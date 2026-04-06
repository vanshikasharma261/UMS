import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import type { CreateUser, UserErrorResponse, UserResponse, UserState } from "../../types/user.types";
import type { RootState } from "../../store/store";
import { logout } from "../auth/authSlice";
import type { Root } from "react-dom/client";



const initialState: UserState = {
    loading: false,
    error: null,
    users: null,
    selectedUser: null,
    formError: null,
}

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = createAsyncThunk<UserResponse[], void, { rejectValue: UserErrorResponse }>('user/fetchUser', async (_, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.token;

    try {
        const response = await fetch(`${API_URL}/user`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (!response.ok) {
            const result: UserErrorResponse = await response.json();
            if (result.statusCode == 401) {
                thunkAPI.dispatch(logout());
            }
            return thunkAPI.rejectWithValue(result);
        }

        const result: UserResponse[] = await response.json();
        return result;
    } catch (err) {
        console.log("Something wrong while fetching users: ", err);
        return thunkAPI.rejectWithValue({ message: "Something went wrong" });
    }

});

export const createUser = createAsyncThunk<UserResponse, CreateUser, { rejectValue: UserErrorResponse }>("user/createUser", async (data, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.token;
    try {
        console.log(data);
        const response = await fetch(`${API_URL}/user`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const result: UserErrorResponse = await response.json();
            if (result.statusCode == 401) {
                thunkAPI.dispatch(logout());
            }
            return thunkAPI.rejectWithValue(result);
        }

        const result: UserResponse = await response.json();
        return result;
    }
    catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue({ message: "Network Error" });
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.loading = false;
        },
        clearFormError: (state) => {
            state.formError = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        }).addCase(getUsers.fulfilled, (state, action) => {
            console.log("Action payload in getUsers.fulfilled is: ", action.payload);
            state.loading = false;
            state.users = action.payload
        }).addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message ?? "something went wrong internally";
        }).addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = [...(state.users ?? []), action.payload];
        }).addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.formError = action.payload?.message ?? "Something Went Wrong";
        })
    }
});

export const { clearError, clearFormError } = userSlice.actions;
export default userSlice.reducer;