import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { postFinish } from "./asyncAction"
import { WorkTimeState } from "../../states/workTimeState"

export const initialState: WorkTimeState = {
    start: 0,
    end: 0,
    workTime: 0,
    totalRestTime: 0
}

const workTimeSlice = createSlice({
    name: "workTime",
    initialState,
    reducers: {
        addRestTime(state: WorkTimeState, action: PayloadAction<number>) {
            state.totalRestTime = state.totalRestTime + action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postFinish.fulfilled, (state, action) => {
            let date = new Date()
            state.end = Math.floor(date.getTime() / 1000)
            if (action.payload.workingTime === 0) {
                state.workTime = action.payload.workingTime
            } else {
                state.workTime = action.payload.workingTime - state.totalRestTime
            }
            state.start = Math.floor(date.getTime() / 1000) - action.payload.workingTime
        })
    }
})

export const {
    addRestTime
} = workTimeSlice.actions

export default workTimeSlice.reducer