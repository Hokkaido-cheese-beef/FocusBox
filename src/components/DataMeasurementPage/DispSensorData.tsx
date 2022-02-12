import { useEffect } from "react";
import { useSensorState } from "../../reducer/sensor/selector"
import { pollingSensorData } from "../../reducer/sensor/asyncAction"
import { useDispatch } from "react-redux";

import Timeline from "@material-ui/lab/Timeline"
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const DispSensorData: React.FC = () => {
    const sensorState = useSensorState().sensor
    const dispatch = useDispatch()
    var timer: NodeJS.Timeout

    const polling = () => {
        timer = setTimeout(() => {
            dispatch(pollingSensorData({ deviceId: sensorState.deviceId }))
            polling()
        }, 1 * 60 * 1000)
    }
    useEffect(() => {
        dispatch(pollingSensorData({ deviceId: sensorState.deviceId }))
        polling()

        return () => clearTimeout(timer)
    }, [sensorState, dispatch, polling])

    return (
        <div style={{ width: "100%" }}>
            <Timeline align="left">
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} style={{ width: "330px", padding: "10px" }}>
                            <Typography variant="h6" component="h1">
                                CO2
                            </Typography>
                            <Typography>{sensorState.CO2} ppm</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} style={{ width: "330px", padding: "10px" }}>
                            <Typography variant="h6" component="h1">
                                室温
                            </Typography>
                            <Typography>{sensorState.Temp} ℃</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                        <Paper elevation={3} style={{ width: "330px", padding: "10px" }}>
                            <Typography variant="h6" component="h1">
                                湿度
                            </Typography>
                            <Typography>{sensorState.Hum} %</Typography>
                        </Paper>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </div>
    )
}

export default DispSensorData