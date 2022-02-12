import { useState } from "react"
import { useEffect } from "react"
import { useBlinkState } from "../../reducer/blink/selector"
import { useSensorState } from "../../reducer/sensor/selector"

type MsgCardProps = {
    title: string,
    description: string,
    width: number,
    bgColor: string
}
type AlertState = {
    isAlert: boolean,
    alertMsg: string
}
const MsgCard: React.FC<MsgCardProps> = (props) => {
    return (
        <div style={{
            display: "flex",
            width: `${props.width}px`,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            backgroundColor: props.bgColor,
            borderRadius: "16px",
            color: "#000",
            fontSize: "18px",
            marginRight: "20px",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                paddingBottom: "8px",
            }}>
                <div style={{ display: "flex" }}>
                    {props.title}
                </div>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }}>
                <div style={{ display: "flex" }}>
                    {props.description}
                </div>
            </div>

        </div>
    )
}

type AlertMsgProps = {
    isAlertSoundOn: boolean
}
const AlertMsg: React.FC<AlertMsgProps> = (props) => {
    const [concentRationAlert, setConcentRationAlert] = useState<AlertState>({ isAlert: false, alertMsg: "" })
    const [sensorAlert, setSensorAlert] = useState<AlertState>({ isAlert: false, alertMsg: "" })
    const [isAlerted, setIsAlerted] = useState(true)
    const blinkState = useBlinkState().blink
    const sensorState = useSensorState().sensor
    var timer: NodeJS.Timeout
    useEffect(() => {

        if (blinkState.isAlert) {
            setConcentRationAlert({ isAlert: blinkState.isAlert, alertMsg: "瞬きの回数から集中度の低下を検知しました。休憩してみましょう！" })
        } else {
            setConcentRationAlert({ isAlert: blinkState.isAlert, alertMsg: "" })
        }

        setSensorAlert({ isAlert: sensorState.isAlert, alertMsg: sensorState.alertmessage })
        const checkAlert = () => {
            if (blinkState.isAlert || sensorState.isAlert) { setIsAlerted(false) }
            if (props.isAlertSoundOn && (blinkState.isAlert || sensorState.isAlert)) {
                const audio = new Audio()
                audio.src = "https://firebasestorage.googleapis.com/v0/b/chattry-223c0.appspot.com/o/Clock-Alarm02-2(Far-Loop).mp3?alt=media&token=69dd8fd5-3698-4a4f-b554-fe77c7c92e94"
                audio.play().then(() => {
                    timer = setTimeout(() => {
                        setIsAlerted(true)
                        checkAlert()
                    }, 15 * 60 * 1000)
                })
            } else {
                timer = setTimeout(() => {
                    setIsAlerted(true)
                    checkAlert()
                }, 15 * 60 * 1000)
            }
        }

        checkAlert()
        return () => {
            setIsAlerted(true)
            clearTimeout(timer)
        }
    }, [blinkState.isAlert, sensorState.isAlert, props.isAlertSoundOn])

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {concentRationAlert.isAlert ? <MsgCard
                width={400}
                bgColor="#FFDCF5"
                title="集中力低下の可能性"
                description={concentRationAlert.alertMsg} /> : <div />}
            {sensorAlert.isAlert ? <MsgCard
                width={400}
                bgColor="#B2FAFF"
                title="集中力低下の可能性"
                description={sensorAlert.alertMsg} /> : <div />}
        </div>

    )
}
export default AlertMsg