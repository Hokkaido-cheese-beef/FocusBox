import { createSlice } from '@reduxjs/toolkit'
import { SensorState } from "../../states/sensorState"
import { fetchSensorIsAction, pollingSensorData } from './asyncAction'

export const initialState: SensorState = {
    deviceId: "",
    CO2: 0,
    Temp: 0,
    Hum: 0,
    alertmessage: "",
    isAlert: false
}


const sensorSlice = createSlice({
    name: "sensor",
    initialState,
    reducers: {
        resetSensorData(state) {
            state.CO2 = 0
            state.Temp = 0
            state.Hum = 0
            state.alertmessage = ""
            state.isAlert = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSensorIsAction.fulfilled, (state, action) => {
            state.deviceId = action.payload.deviceId;
        })
        builder.addCase(fetchSensorIsAction.rejected, (state, action) => {
            state.deviceId = "";
        })
        builder.addCase(pollingSensorData.fulfilled, (state, action) => {
            state.CO2 = action.payload.CO2
            state.Hum = action.payload.Hum
            state.Temp = action.payload.Temp
            state.alertmessage = action.payload.alertmessage
            state.isAlert = action.payload.alertmessage !== ""
        })
    }
})
export const {
    resetSensorData
} = sensorSlice.actions

export default sensorSlice.reducer