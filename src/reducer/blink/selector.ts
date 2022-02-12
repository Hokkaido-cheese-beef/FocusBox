import { useSelector } from "react-redux"
import { BlinkState } from "../../states/blinkState"

export const useBlinkState = () => {
    return useSelector((state: { blink: BlinkState }) => state)
}