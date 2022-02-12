import React from "react"
import WebCam from "react-webcam"
import "@tensorflow/tfjs"
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import { tempRecord } from "../states/blinkState"
import { getTime, convertTimetoStr } from "./time"

// --- 瞬き検知用の変数 ---
// 目の開き具合を計算するための補助用変数
var eyeSizeSum = 0
var eyeSizeAvg = 0
var isFirstDetection = true
var cntSum = 0

// 瞬きを検出するための補正値
const borderNum = 0.84
const openBorderCorrection = 0.08

// 瞬きの回数を数える
var blinkCnt = 0
const blinked = () => {
    blinkCnt++
}
// 前の状況で目が開いていたかを判定するフラグ
var isBeforeOpenEye = true

const initBlinkVar = () => {
    eyeSizeSum = 0
    eyeSizeAvg = 0
    isFirstDetection = true
    cntSum = 0
    blinkCnt = 0
}

// --- 集中度知用の変数 ---
var blinkCntBase = 0
var startTime = "" // 一定期間の瞬きの基準値
var tempRecords: tempRecord[] = []
var prevConcentration = 50 // 前回の集中度
var prevTempTime: string
var isFirstMesureConcentration = true
var cntMesureConcentrationSum = 0
var lowerConcentrationCnt = 0
var isAlertConcentration = false
const initConcentrationVar = () => {
    blinkCntBase = 0
    startTime = ""
    tempRecords = []
    prevConcentration = 50
    prevTempTime = ""
    isFirstMesureConcentration = true
    cntMesureConcentrationSum = 0
    lowerConcentrationCnt = 0
    isAlertConcentration = false
}

export const loadFaceLandmark = async (
    videoRef: React.RefObject<WebCam>,
    changeAlertState: (flag: boolean) => void
) => {
    const network = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 3 }
    )
    changeAlertState(false)
    initBlinkVar()
    initConcentrationVar()
    setInterval(() => {
        detectFaceLandmark(network, videoRef, changeAlertState)
    }, 100)
}

const detectFaceLandmark = async (
    network: faceLandmarksDetection.FaceLandmarksPackage,
    videoRef: React.RefObject<WebCam>,
    changeAlertState: (flag: boolean) => void
) => {
    if (
        typeof videoRef.current !== "undefined" &&
        videoRef.current !== null &&
        videoRef.current.video?.readyState === 4
    ) {
        const video = videoRef.current.video
        const videoWidth = videoRef.current.video.videoWidth;
        const videoHeight = videoRef.current.video.videoHeight;
        if (videoWidth === 0 || videoHeight === 0) {
            return
        }

        // ここからが瞬きを検知するためのコード
        const faceEstimate = await network.estimateFaces({ input: video })

        const mainface = faceEstimate[0] as any
        if (mainface) {
            if (isFirstDetection) {
                // 目の開き具合の計測
                // 最初の読み込み時は取得するサイズが間違っている
                cntSum++
                eyeSizeSum += (mainface.scaledMesh[386][1] - mainface.scaledMesh[374][1]) / (mainface.scaledMesh[6][1] - mainface.scaledMesh[2][1])
                if (cntSum > 99) {
                    eyeSizeAvg = eyeSizeSum / cntSum
                    console.log("First, eyeSizeAvg", eyeSizeAvg)
                    isFirstDetection = false
                    eyeSizeSum = 0
                    cntSum = 0
                }
            } else {
                // 瞬きの回数の計測
                const difFace = mainface.scaledMesh[6][1] - mainface.scaledMesh[2][1]
                const difEye = mainface.scaledMesh[386][1] - mainface.scaledMesh[374][1]
                const difEyeRatio = difEye / difFace
                eyeSizeSum += difEyeRatio
                cntSum++
                if (cntSum > 49) {
                    eyeSizeAvg = eyeSizeSum / cntSum
                    console.log(`now eyeSizeAvg ${eyeSizeAvg}, boder is ${eyeSizeAvg * borderNum}`)
                    eyeSizeSum = 0
                    cntSum = 0
                }
                if (difEyeRatio < (eyeSizeAvg * borderNum) && isBeforeOpenEye) {
                    isBeforeOpenEye = false
                    blinked()
                    console.log("blink count", blinkCnt)
                } else if (difEyeRatio > (eyeSizeAvg * (borderNum + openBorderCorrection)) && !isBeforeOpenEye) {
                    isBeforeOpenEye = true
                    console.log("o\np\ne\nn\n \ne\ny\ne\n")
                }

                // 集中度計測の処理
                cntMesureConcentrationSum++
                if (cntMesureConcentrationSum > 299) {
                    prevTempTime = convertTimetoStr(getTime())
                    if (isFirstMesureConcentration) {
                        blinkCntBase = blinkCnt
                        isFirstMesureConcentration = false
                        startTime = prevTempTime
                    } else {
                        prevConcentration = prevConcentration + ((blinkCntBase - blinkCnt) * 2.5)
                        if (prevConcentration > 100) {
                            prevConcentration = 100
                        } else if (prevConcentration < -100) {
                            prevConcentration = -100
                        }
                        tempRecords.push({
                            untilTime: prevTempTime,
                            blinkCnt: blinkCnt,
                            concentration: prevConcentration
                        })
                        if (prevConcentration < 0) {
                            if (lowerConcentrationCnt < 5) lowerConcentrationCnt++
                            if (lowerConcentrationCnt > 4) {
                                if (!isAlertConcentration) {
                                    changeAlertState(true)
                                    isAlertConcentration = true
                                }
                                console.log("Alert call")
                            }
                            console.log("Alert, Concentration is low state.", prevConcentration)
                        } else {
                            if (lowerConcentrationCnt > 0) {
                                lowerConcentrationCnt--
                                if (lowerConcentrationCnt === 0 && isAlertConcentration) {
                                    isAlertConcentration = false
                                    changeAlertState(false)
                                }
                            }
                        }
                    }
                    cntMesureConcentrationSum = 0
                    blinkCnt = 0
                }
            }
        }

    }
}