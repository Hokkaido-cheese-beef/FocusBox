import { useSelector } from "react-redux"
import { WorkTimeState } from "../../states/workTimeState"

export const useWorkTimeState = () => {
    return useSelector((state: { workTime: WorkTimeState }) => state)
}