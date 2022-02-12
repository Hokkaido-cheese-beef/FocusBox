import { createSlice} from '@reduxjs/toolkit'
import { UserState } from "../../states/userState"
import { postLogin } from './asyncAction'

export const initialState: UserState = {
    userID: "",
    password: "",
    login: {
        isLogin: false,
        errorMsg: ""
    }
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.userID = action.meta.arg.userID;
            state.password = action.meta.arg.password;
            state.login = {
                isLogin: action.payload.isLoginSuccess,
                errorMsg: action.payload.errorMsg
            }
        })
        builder.addCase(postLogin.rejected, (state, action) => {
            if (action.payload) {
                state.login = {
                    isLogin: action.payload.isLoginSuccess,
                    errorMsg: action.payload.errorMsg
                }
            }
        })
    }
})

export default userSlice.reducer