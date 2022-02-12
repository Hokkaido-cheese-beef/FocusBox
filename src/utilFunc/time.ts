export type TimeDate = {
    month: number,
    day: number,
    hour: number,
    min: number,
    sec: number
}

export type Timer = {
    hour: number,
    min: number,
    sec: number
}

// 現在の時間をTimeDate型で返す関数
export const getTime = (): TimeDate => {
    const date = new Date()
    const month = Number(date.getMonth()) + 1
    const day = Number(date.getDate())
    const hour = Number(date.getHours())
    const min = Number(date.getMinutes())
    const sec = Number(date.getSeconds())
    return {
        month: month,
        day: day,
        hour: hour,
        min: min,
        sec: sec
    }
}

// タイマーで設定された時間をもとにアラームを鳴らす時間を取得する関数
export const getGoalTime = (nowTime: Date, hour: number, min: number, sec: number): Date => {
    return new Date(nowTime.getTime() + (hour * 3600 * 1000 + min * 60 * 1000 + sec * 1000))
}

// 第一引数から第二引数まで残りどれだけの秒数があるかを消す関数
export const difTime = (timeNow: Date, goalTime: Date): number => {
    return Math.floor((goalTime.getTime() - timeNow.getTime()) / 1000)
}

// タイマーで残り時間を表示する時に使う。引数はgetGoalTime()で得た残り時間を表す秒数
export const getLeftTime = (difSec: number): Timer => {
    const remHour = difSec % (3600 * 1000)
    const remMin = remHour % (60 * 1000)
    return {
        hour: Math.floor((difSec - remHour) / (3600 * 1000)),
        min: Math.floor((remHour - remMin) / (60 * 1000)),
        sec: Math.floor(remMin / (1000))
    }
}

export const convertTimetoStr = (time: TimeDate) => {
    return time.month + "_" + time.day + "_" + time.hour + "_" + time.min + "_" + time.sec
}