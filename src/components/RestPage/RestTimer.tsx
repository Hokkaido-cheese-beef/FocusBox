import { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux"
import { addRestTime } from "../../reducer/workTime/slice"
import { postActivity } from "../../reducer/workTime/asyncAction"
import { useUserState } from "../../reducer/user/selector"

const Timer: React.FC = () => {
    const state = useUserState().user
    const dispatch = useDispatch();
    const [timerText, settimerText] = useState("00:00")
    const [timerSecond, settimerSecond] = useState(0)
    const [timerMinute, settimerMinute] = useState(0)
    const [restTime, setrestTime] = useState(0)
    const [timerSwitch, settimerSwitch] = useState(false)
    let interval: NodeJS.Timeout


    const handlebuttonStart = () => {
        if (timerSwitch === false) {
            dispatch(postActivity({ userID: state.userID, timestamp: Math.floor(new Date().getTime() / 1000), status: 2 }))
            setrestTime(timerMinute * 60 + timerSecond)
            settimerSwitch(true)
        }
    }
    const handlebuttonUpMinute = () => {
        if (timerMinute + 5 > 55) {
            settimerText(`60:00`)
            settimerMinute(60)
        } else {
            settimerMinute(timerMinute + 5)
            if (timerMinute + 5 < 10 && timerSecond < 10) {
                settimerText(`0${timerMinute + 5}:0${timerSecond}`)
            } else if (timerSecond < 10) {
                settimerText(`${timerMinute + 5}:0${timerSecond}`)
            } else {
                settimerText(`${timerMinute + 5}:${timerSecond}`)
            }
        }
    }

    const handlebuttonDownMinute = () => {
        if (timerMinute - 5 < 0) {
            settimerMinute(0)
            if (timerSecond < 10) {
                settimerText(`00:0${timerSecond}`)
            } else {
                settimerText(`00:${timerSecond}`)
            }
        } else {
            settimerMinute(timerMinute - 5)
            if (timerMinute - 5 < 10 && timerSecond < 10) {
                settimerText(`0${timerMinute - 5}:0${timerSecond}`)
            } else if (timerSecond < 10) {
                settimerText(`${timerMinute - 5}:0${timerSecond}`)
            } else {
                settimerText(`${timerMinute - 5}:${timerSecond}`)
            }
        }
    }

    const handlebuttonUpSecond = () => {
        if (timerMinute >= 60) {
            settimerSecond(0)
            settimerText(`60:00`)
        } else if (timerSecond + 10 > 50) {
            settimerSecond(50)
            if (timerMinute < 10) {
                settimerText(`0${timerMinute}:50`)
            } else {
                settimerText(`${timerMinute}:50`)
            }
        } else {
            settimerSecond(timerSecond + 10)
            if (timerMinute < 10) {
                settimerText(`0${timerMinute}:${timerSecond + 10}`)
            } else {
                settimerText(`${timerMinute}:${timerSecond + 10}`)
            }
        }
    }

    const handlebuttonDownSecond = () => {
        if (timerSecond - 10 < 10) {
            settimerSecond(0)
            if (timerMinute < 10) {
                settimerText(`0${timerMinute}:00`)
            } else {
                settimerText(`${timerMinute}:00`)
            }
        } else {
            settimerSecond(timerSecond - 10)
            if (timerMinute < 10 && timerSecond - 10 < 10) {
                settimerText(`0${timerMinute}:0${timerSecond - 10}`)
            } else if (timerSecond < 10) {
                settimerText(`${timerMinute}:0${timerSecond - 10}`)
            } else if (timerMinute < 10) {
                settimerText(`0${timerMinute}:${timerSecond - 10}`)
            } else {
                settimerText(`${timerMinute}:${timerSecond - 10}`)
            }
        }
    }

    const showTime = () => {
        if (timerSecond < 10 && timerMinute < 10) {
            settimerText(`0${timerMinute}:0${timerSecond}`)
        } else if (timerMinute < 10) {
            settimerText(`0${timerMinute}:${timerSecond}`)
        } else if (timerSecond < 10) {
            settimerText(`${timerMinute}:0${timerSecond}`)
        } else {
            settimerText(`${timerMinute}:${timerSecond}`)
        }
    }
    const timercalc = () => {
        if (timerSwitch) {
            if (timerMinute === 0 && timerSecond === 0) {
                settimerSwitch(false)
                dispatch(addRestTime(restTime))
            } else if (timerSecond === 0) {
                settimerMinute(timerMinute - 1)
                settimerSecond(59)
            } else {
                settimerSecond(timerSecond - 1)
            }
            showTime()
        }
    }

    useEffect(() => {
        interval = setInterval(() => {
            timercalc()
        }, 1000);
        return () => clearInterval(interval);
    }, [timerMinute, timerSecond, timerSwitch]);



    return (
        <div style={{ width: "700px", height: "400px" }}>
            <div style={{ display: "flex", marginTop: "20px" }}>
                <div style={{ display: "flex", width: "700px", height: "auto", textAlign: "center", justifyContent: "center" }}>
                    <Button onClick={handlebuttonUpMinute} style={{ fontSize: 20, width: "60px", height: "60px", borderRadius: "30px", color: "#000", backgroundColor: "#B2FAFF", marginRight: "90px" }}>
                        + 5
                    </Button>
                    <Button onClick={handlebuttonUpSecond} style={{ fontSize: 20, width: "60px", height: "60px", borderRadius: "30px", color: "#000", backgroundColor: "#FFDCF5" }}>
                        + 10
                    </Button>
                </div>
            </div>
            <div style={{ height: "auto", paddingBottom: "20px" }}>
                <div style={{
                    fontSize: 140, textAlign: "center", color: "#fff", marginBottom: "auto", marginTop: "auto", marginBlockStart: "0em",
                    marginBlockEnd: "0em", lineHeight: "1em"
                }}>
                    {timerText}
                </div>
            </div>
            <div style={{ width: "700px", height: "60px", textAlign: "center" }}>
                <Button onClick={handlebuttonDownMinute} style={{ fontSize: 20, width: "60px", height: "60px", borderRadius: "30px", color: "#000", backgroundColor: "#B2FAFF", marginRight: "90px" }}>
                    - 5
                </Button>
                <Button onClick={handlebuttonDownSecond} style={{ fontSize: 20, width: "60px", height: "60px", borderRadius: "30px", color: "#000", backgroundColor: "#FFDCF5" }}>
                    - 10
                </Button>
            </div>
            <div style={{ width: "700px", height: "60px", textAlign: "center", paddingTop: "40px" }}>
                <Button onClick={handlebuttonStart}
                    variant="contained"
                    style={{ backgroundColor: "#bb86fc", fontSize: 20, color: "#fff" }}>
                    休憩を開始する
                </Button>
            </div>
        </div >
    )
}
export default Timer