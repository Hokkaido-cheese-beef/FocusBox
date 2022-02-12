import { useSelector } from "react-redux"
import { SensorState } from "../../states/sensorState"

export const useSensorState = () => {
    return useSelector((state: { sensor: SensorState }) => state)
}