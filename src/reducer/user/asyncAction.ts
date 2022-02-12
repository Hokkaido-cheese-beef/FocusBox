import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PostLoginParam, PostLoginResponse, LoginSuccess, LoginFalse } from '../../states/userState'
import urls from '../../states/urlState'

export const postLogin = createAsyncThunk<
    LoginSuccess,
    PostLoginParam,
    { rejectValue: LoginFalse }
>(
    'user/login',
    async (props, { rejectWithValue }) => {
        const url: string = urls.basicURL + urls.login
        try {
            const response = await axios.post<PostLoginResponse>(url, {
                userID: props.userID,
                password: props.password
            })
            const isSuccess = response.data.errorMsg === undefined ? true : false
            return {
                isLoginSuccess: isSuccess,
                errorMsg: response.data.errorMsg === undefined ? "" : response.data.errorMsg
            }
        } catch (e) {
            return rejectWithValue({
                isLoginSuccess: false,
                errorMsg: "connection erro:" + e
            })
        }
    }
)
