import DetectCamera from "./DetectCamera"
import { Button } from "@material-ui/core"
import DetectDevice from "./DetectDevice"
import { useUserState } from "../../reducer/user/selector"
import { useSensorState } from "../../reducer/sensor/selector"
import { useState } from "react"
import { postActivity } from "../../reducer/workTime/asyncAction"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
const DeviceSettingPage: React.FC = () => {
    const SensorState = useSensorState()
    const [isShowPopup, setIsShowPopup] = useState(false)
    const history = useHistory()
    const userState = useUserState()
    if (!userState.user.login.isLogin) history.push("/login")
    const dispatch = useDispatch()
    const handleButton = () => {
        if (SensorState.sensor.deviceId === "") {
            setIsShowPopup(true)
        } else {
            dispatch(postActivity({ userID: userState.user.userID, timestamp: Math.floor(new Date().getTime() / 1000), status: 1 }))
            history.push("/DataMeasurement")
        }
    }

    function Popup() {
        const history = useHistory()
        const handleButton = () => {
            dispatch(postActivity({ userID: userState.user.userID, timestamp: Math.floor(new Date().getTime() / 1000), status: 1 }))
            history.push("/DataMeasurement")
        }
        const deletePopupButton = () => {
            setIsShowPopup(false)
        }
        return (
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                margin: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                zIndex: 99,
            }}>
                <div style={{
                    padding: "20px",
                    position: "absolute",
                    borderRadius: "15px",
                    width: "495px",
                    height: "207px",
                    left: "37%",
                    top: "5%",
                    color: "white",
                    background: "black",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                }}>
                    <p>注意</p>
                    <p>デバイス確認が終了していません</p>
                    <p>デバイスを確認せずに開始しますか？</p>
                    <div style={{ display: "frex", textAlign: "right", marginRight: "15px" }}>
                        <button style={{ marginRight: "30px" }} onClick={handleButton}>開始する</button>
                        <button onClick={deletePopupButton}>デバイスを確認する</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {isShowPopup ? <Popup /> : <p></p>}
            <DetectCamera />
            <DetectDevice />
            <div style={{ display: "flex", width: "100%", paddingTop: "50px", justifyContent: "center", alignItems: "center" }}>
                <Button
                    variant="contained"
                    onClick={handleButton}
                    style={{ textAlign: "center", margin: "auto", backgroundColor: "#bb86fc", color: "white", fontSize: "20px" }}
                >作業を開始する　→
                </Button>
            </div>
        </div>
    )
}

export default DeviceSettingPage