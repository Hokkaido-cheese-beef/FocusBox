export type WorkTimeState = {
    start: number,
    end: number,
    workTime: number,
    totalRestTime: number
}

export type PostActivityParam = {
    userID: string,
    timestamp: number,
    status: number
}

export type PostFinishResponse = {
    workingTime: number
}

export type PostActivityResponse = {
    Message: string
}

export type PostFinishSuccess = {
    workingTime: number
}

export type PostActivitySuccess = {
    Message: string
}
export type FinishFalse = {
    isFinishSuccess: boolean,
    errorMsg: string
}