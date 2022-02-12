import { useState, useEffect } from "react"
import WebCam from "react-webcam"
import { useBlinkState } from "../../reducer/blink/selector"


type CameraProps = {
    height: number,
    width: number,
    cameraRef: React.RefObject<WebCam>,
    isSetting?: boolean
}

export const isVideoAlive = (videoRef: React.RefObject<WebCam>): boolean => {
    if (
        typeof videoRef.current !== "undefined" &&
        videoRef.current !== null &&
        videoRef.current.video?.readyState === 4
    ) {
        return true
    } else {
        return false
    }
}
const Camera: React.FC<CameraProps> = (props, isCamera) => {
    const [deviceId, setDeviceId] = useState("")
    var cameraState = useBlinkState().blink.deviceId
    useEffect(() => {
        setDeviceId(cameraState)
    }, [cameraState])
    return <div>
        {deviceId !== "" || props.isSetting ?
            <WebCam
                height={props.height}
                width={props.width}
                ref={props.cameraRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 9
                }}
                videoConstraints={{
                    deviceId: deviceId,
                    width: props.width,
                    height: props.height
                }}
            /> : <div />}
    </div>
}

export default Camera