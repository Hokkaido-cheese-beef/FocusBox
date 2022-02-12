import { useState, useRef, useEffect } from "react";
import WebCam from "react-webcam"
import { DevicesType } from "../../states/blinkState";
import { setDeviceId } from "../../reducer/blink/slice";
import { useDispatch } from "react-redux"

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button } from "@material-ui/core"
import ReplayIcon from '@material-ui/icons/Replay';
import Camera from "../utilComponent/camera"
import { Grid, GridArea } from "../utilComponent/Grid"
import { OutWrapper } from "./styledComponents"

import { Slider } from "./styledComponents"
const DetectCamera: React.FC = () => {
    const [videoDeviceDatas, setVideoDeviceDatas] = useState<DevicesType[]>([])
    const webcameraReference = useRef<WebCam>(null)
    const dispatch = useDispatch();

    const changeDeviceState = (deviceId: string) => {
        dispatch(setDeviceId(deviceId))
    }
    const reloadVideoDeviceDatas = async () => {
        const devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === "videoinput")
        const temp = devices.map((deviceData) => {
            return {
                deviceId: deviceData.deviceId,
                deviceName: deviceData.label
            }
        })
        setVideoDeviceDatas(temp)
    }
    useEffect(() => {
        let unmounted = false
        const getVideoDeviceDatas = async () => {
            const devices = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === "videoinput")
            if (!unmounted) {
                const temp = devices.map((deviceData) => {
                    return {
                        deviceId: deviceData.deviceId,
                        deviceName: deviceData.label
                    }
                })
                setVideoDeviceDatas(temp)
            }
        }
        getVideoDeviceDatas()
    }, [])




    return <OutWrapper>
        <Grid
            columns={["285px", "675px"]}
            rows={[
                "75px",
                "325px"
            ]}
            areas={[
                ["video-select-title", "video"],
                ["video-selector", "video"]
            ]}
        >
            <GridArea name="video-select-title">
                <div style={{ fontSize: "40px", display: "flex", alignItems: "center" }}>
                    カメラ検知
                    <Button
                        onClick={() => { reloadVideoDeviceDatas() }}
                        style={{ marginLeft: "10px", backgroundColor: "#bb86fc", width: "40px", height: "40px" }}
                    >
                        <ReplayIcon></ReplayIcon>
                    </Button>
                </div>
            </GridArea>
            <GridArea name="video">
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "auto"
                    }}>
                    <Camera
                        height={400}
                        width={675}
                        cameraRef={webcameraReference}
                        isSetting={true}
                    />
                </div>
            </GridArea>
            <GridArea name="video-selector">
                <Slider>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="videoSelectRadioBtn" name="videoSelectRadioBtn" >
                            {VideoSelector(videoDeviceDatas, changeDeviceState)}
                        </RadioGroup>
                    </FormControl>
                </Slider>
            </GridArea>
        </Grid>
    </OutWrapper >
}

export default DetectCamera


const VideoSelector = (devicesDatas: DevicesType[], onSelectFunc: (deviceId: string) => void) => {
    if (devicesDatas.length > 0) {
        return devicesDatas.map((devieceData, index) => {
            const deviceName = devieceData.deviceName
            return <FormControlLabel
                key={"video-list-" + index}
                value={deviceName !== "" ? deviceName : devieceData.deviceId}
                control={<Radio style={{ color: "#bb86fc" }} />}
                label={deviceName !== "" ? deviceName : devieceData.deviceId}
                onChange={() => {
                    onSelectFunc(devieceData.deviceId)
                }}
            />
        })
    } else {
        return <div />
    }
}