import { Button } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { useEffect, useState } from "react"
import { fetchSensorIsAction } from "../../reducer/sensor/asyncAction"
import { useSensorState } from "../../reducer/sensor/selector"
import { useDispatch } from "react-redux"
import { CheckCircleOutline } from "@material-ui/icons"
import { Grid, GridArea } from "../utilComponent/Grid"

const DetectDevice: React.FC = () => {
    const [inputId, setInputId] = useState("")
    const dispatch = useDispatch()
    const SensorState = useSensorState()
    const handleButton = () => {
        dispatch(fetchSensorIsAction({ deviceId: inputId }))
    }

    useEffect(() => {
        setInputId(SensorState.sensor.deviceId)
    }, [SensorState.sensor.deviceId])

    return (
        <div style={{ display: "flex", height: "auto", width: "100%", justifyContent: "center", paddingTop: "20px" }}>
            <Grid
                columns={["450px", "310px", "200px"]}
                rows={[
                    "60px",
                    "70px",
                    // "auto"
                ]}
                areas={[
                    ["title-device-mesuring", "title-device-mesuring", "title-device-mesuring"],
                    ["label-device-mesuring", "input-device-mesuring", "btn-device-mesuring"],
                    // ["alert-msg-mesuring", "alert-msg-mesuring"]
                ]}
            >
                <GridArea name="title-device-mesuring">
                    <div style={{
                        width: "auto", fontSize: "46px",
                    }}>
                        デバイス検知
                    </div>
                </GridArea>
                <GridArea name="label-device-mesuring">
                    <div style={{ width: "auto", fontSize: "46px", }}>
                        デバイスIDを入力
                    </div>
                </GridArea>
                <GridArea name="input-device-mesuring" style={{ display: "flex", alignItems: "center" }}>
                    <input onChange={(e) => { setInputId(e.target.value) }} value={inputId} style={{ backgroundColor: "lightgray", width: "300px", height: "40px", fontSize: "25px" }}>
                    </input>
                </GridArea>
                <GridArea name="btn-device-mesuring" style={{ display: "flex", alignItems: "center" }}>
                    <Button onClick={handleButton} startIcon={<Add />} variant="contained" style={{ textAlign: "center", backgroundColor: "#bb86fc", width: "144px", height: "48px", color: "white" }}>接続を確認</Button>
                    {SensorState.sensor.deviceId === "" ? "" : <CheckCircleOutline />}
                </GridArea>
            </Grid>
        </div>
    )
}
export default DetectDevice