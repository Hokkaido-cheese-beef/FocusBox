import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux"
import { changeAlertState } from "../../reducer/blink/slice";
import WebCam from "react-webcam"

import { loadFaceLandmark } from "../../utilFunc/face_detection";

import { Grid, GridArea } from "../utilComponent/Grid"
import Button from '@material-ui/core/Button';
import Camera from "../utilComponent/camera"
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

const MesureBlink: React.FC = () => {
    const dispatch = useDispatch()

    const webcameraReference = useRef<WebCam>(null)
    const [isShowCamera, setIsShowCamera] = useState(true)
    useEffect(() => {
        let unmounted = false
        const changeAlert = (flag: boolean) => {
            dispatch(changeAlertState(flag))
        }
        const startLoadFaceLandmark = async () => {
            if (!unmounted) {
                await loadFaceLandmark(webcameraReference, changeAlert)
            }
        }
        startLoadFaceLandmark()

        const cleanup = () => {
            unmounted = true
        }
        return cleanup
    }, [dispatch])

    const onClicked = () => {
        setIsShowCamera(!isShowCamera)
    }


    return (
        <Grid
            columns={["560px"]}
            rows={[
                "340px",
                "72px"
            ]}
            areas={[
                ["video"],
                ["video-switchBtn"]
            ]}
        >
            <GridArea name="video">
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "auto"
                    }}>
                    <Camera
                        height={340}
                        width={560}
                        cameraRef={webcameraReference}
                    />
                    {!isShowCamera ? <div style={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        left: "0px",
                        top: "0px",
                        height: "340px",
                        width: "560px",
                        zIndex: 9,
                        backgroundColor: "#444"
                    }} >
                        <VideocamOffIcon style={{ fontSize: 80 }} />
                    </div> : <div />}

                </div>
            </GridArea>
            <GridArea name="video-switchBtn">
                <div style={{
                    display: "flex", alignItems: "flex-end",
                    justifyContent: "center", width: "100%", height: "100%"
                }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ backgroundColor: "#bb86fc" }}
                        endIcon={!isShowCamera ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        onClick={onClicked}
                    >
                        {!isShowCamera ? "カメラオフ" : "カメラオン"}
                    </Button>
                </div>
            </GridArea>
        </Grid >
    )
}

export default MesureBlink