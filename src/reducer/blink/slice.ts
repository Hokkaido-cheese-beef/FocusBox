import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BlinkState, TermBlinkData } from "../../states/blinkState"

export const initialState: BlinkState = {
    deviceId: "",
    records: [],
    isAlert: false
}


const blinkSlice = createSlice({
    name: "blink",
    initialState,
    reducers: {
        setDeviceId(state: BlinkState, action: PayloadAction<string>) {
            state.deviceId = action.payload
        },
        addBlinkRecord(state: BlinkState, action: PayloadAction<TermBlinkData>) {
            state.records.unshift(action.payload)
        },
        changeAlertState(state: BlinkState, action: PayloadAction<boolean>) {
            state.isAlert = action.payload
        }
    },
})

export const {
    setDeviceId,
    addBlinkRecord,
    changeAlertState
} = blinkSlice.actions

export default blinkSlice.reducer