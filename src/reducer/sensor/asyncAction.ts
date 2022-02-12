import { checkSensorParam, checkSensorSuccess, checkSensorFalse, checkSensorResponse, PollingResponse, CheckPollingParam, CheckPollingResponse } from './../../states/sensorState';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import urls from '../../states/urlState'

export const fetchSensorIsAction = createAsyncThunk<
    checkSensorSuccess,
    checkSensorParam,
    { rejectValue: checkSensorFalse }
>(
    'sensor/fetchSensorIsAction',
    async (props, { rejectWithValue }) => {
        const url = urls.basicURL + urls.checkSensor + props.deviceId
        try {
            const res = await axios.get<checkSensorResponse>(url)
            return {
                deviceId: props.deviceId,
                Message: res.data.Message
            }
        } catch (e) {
            return rejectWithValue({
                deviceId: props.deviceId,
                Message: "Error"
            })
        }
    }
)
export const pollingSensorData = createAsyncThunk<PollingResponse, CheckPollingParam, { rejectValue: checkSensorFalse }>(
    'sensor/pollingSensorData',
    async (props, { rejectWithValue }) => {
        const url = urls.basicURL + urls.polling + props.deviceId

        try {
            const res = await axios.get<CheckPollingResponse>(url)
            return {
                CO2: res.data.co2,
                Temp: res.data.temp,
                Hum: res.data.hum,
                alertmessage: res.data.message
            }
        } catch (e) {
            return rejectWithValue({
                deviceId: props.deviceId,
                Message: "Error"
            })
        }

    }
)