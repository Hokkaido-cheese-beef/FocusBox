export type checkSensorParam = {
    deviceId: string
}
export type checkSensorSuccess = {
    deviceId: string,
    Message: string
}
export type checkSensorResponse = {
    Message: string
}
export type checkSensorFalse = {
    deviceId: string,
    Message: string
}

export type SensorState = {
    deviceId: string,
    CO2: number,
    Temp: number,
    Hum: number,
    alertmessage: string,
    isAlert: boolean
}

export type FetchResponse = {
    CO2: number,
    Temp: number,
    Hum: number,
    alertmessage?: string
    isFetchSuccess: boolean
}


export type PollingResponse = {
    CO2: number,
    Temp: number,
    Hum: number,
    alertmessage: string
}

export type CheckPollingResponse = {
    co2: number,
    temp: number,
    hum: number,
    message: string
}

export type CheckPollingParam = {
    deviceId: string
}