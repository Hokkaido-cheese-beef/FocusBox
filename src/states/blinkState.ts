export type BlinkState = {
    deviceId: string, // 使用するカメラを決定する変数
    records: TermBlinkData[], // 集中度計測の記録
    isAlert: boolean
}

// 作業開始から休憩、または作業終了までの期間の記録
export type TermBlinkData = {
    startTime: string, // 計測開始時間
    endTime: string, // 計測終了時間
    blinkBase: number, // 瞬きの基準値
    tempRecords: tempRecord[] // 30~60秒間の期間の途中データ
}

export type tempRecord = {
    untilTime: string, // どこまでの時間の記録か示す ~ 00:15
    blinkCnt: number, // 瞬きの回数
    concentration: number //集中度の記録
}

export type DevicesType = {
    deviceName: string,
    deviceId: string
}