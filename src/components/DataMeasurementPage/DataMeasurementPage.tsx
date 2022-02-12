import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserState } from "../../reducer/user/selector"

import { postFinish } from "../../reducer/workTime/asyncAction"

import Button from '@material-ui/core/Button';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { Grid, GridArea } from "../utilComponent/Grid"
import MesureBlink from "./MesureBlink"
import DispSensorData from "./DispSensorData"
import AlertMsg from "./AlertMsg"
import { resetSensorData } from "../../reducer/sensor/slice"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router"

const DataMeasurementPage: React.FC = () => {
    const [isSoundOn, setIsSoundOn] = useState(false)
    const userState = useUserState().user
    const history = useHistory()
    if (!userState.login.isLogin) history.push("/login")
    const dispatch = useDispatch()
    const finishWorkbuttonClick = () => {
        dispatch(postFinish({ userID: userState.userID, timestamp: Math.floor(new Date().getTime() / 1000), status: 4 }))
    }
    useEffect(() => {
        return () => {
            dispatch(resetSensorData())
        }
    }, [dispatch])
    return (
        <div style={{ display: "flex", width: "100%", paddingTop: "80px", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", width: "1060px", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#bb86fc" }}
                >
                    <Link to="/DeviceSetting" style={{ textDecoration: "none", color: "#fff" }}>デバイス設定</Link>
                </Button>
            </div>
            <Grid
                columns={["560px", "400px"]}
                rows={[
                    "430px",
                    "90px",
                    "auto"
                ]}
                areas={[
                    ["video-mesuring", "data-mesuring"],
                    ["btn-mesuring", "btn-mesuring"],
                    ["alert-msg-mesuring", "alert-msg-mesuring"]
                ]}
            >
                <GridArea name="video-mesuring">
                    <MesureBlink />
                </GridArea>
                <GridArea name="data-mesuring">
                    <DispSensorData />
                </GridArea>
                <GridArea name="btn-mesuring">
                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <div style={{ display: "flex", marginRight: "80px" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ backgroundColor: "#bb86fc" }}
                                endIcon={isSoundOn ? <NotificationsActiveIcon /> : <NotificationsOffIcon />}
                                onClick={() => {
                                    setIsSoundOn(!isSoundOn)
                                }}
                            >
                                {isSoundOn ? "通知オン" : "通知オフ"}
                            </Button>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "#bb86fc", marginRight: "10px" }}
                            >
                                <Link to="/Rest" style={{ textDecoration: "none", color: "#fff" }}>休憩</Link>
                            </Button>
                            <Button
                                onClick={finishWorkbuttonClick}
                                variant="contained"
                                style={{ backgroundColor: "#bb86fc" }}
                            >
                                <Link to="/Result" style={{ textDecoration: "none", color: "#fff" }}>作業終了</Link>
                            </Button>
                        </div>
                    </div>

                </GridArea>
                <GridArea name="alert-msg-mesuring">
                    <AlertMsg isAlertSoundOn={isSoundOn} />
                </GridArea>
            </Grid>
        </div>
    )
}

export default DataMeasurementPage