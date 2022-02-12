import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { PostActivityResponse, PostActivityParam, PostFinishResponse, PostActivitySuccess, PostFinishSuccess, FinishFalse } from '../../states/workTimeState'
import urls from '../../states/urlState'

export const postFinish = createAsyncThunk<
    PostFinishSuccess,
    PostActivityParam,
    { rejectValue: FinishFalse }
>(
    'workTime/postFinish',
    async (props, { rejectWithValue }) => {
        const url: string = urls.basicURL + urls.endActivityRegist
        try {
            const response = await axios.post<PostFinishResponse>(url, {
                userID: props.userID,
                timestamp: props.timestamp,
                status: props.status
            })
            return {
                workingTime: response.data.workingTime
            }
        } catch (e) {
            return rejectWithValue({
                isFinishSuccess: false,
                errorMsg: "connection erro:" + e
            })
        }
    }
)

export const postActivity = createAsyncThunk<
    PostActivitySuccess,
    PostActivityParam,
    { rejectValue: FinishFalse }
>(
    '/workTime/postActivity',
    async (props, { rejectWithValue }) => {
        const url: string = urls.basicURL + urls.ActivityRegist
        try {
            const response = await axios.post<PostActivityResponse>(url, {
                userID: props.userID,
                timestamp: props.timestamp,
                status: props.status
            })
            return {
                Message: response.data.Message
            }
        } catch (e) {
            return rejectWithValue({
                isFinishSuccess: false,
                errorMsg: "connection erro:" + e
            })
        }
    }
)