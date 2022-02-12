import { useState } from "react";
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import Timer from "./RestTimer"
import { useUserState } from "../../reducer/user/selector";
import { postFinish, postActivity } from "../../reducer/workTime/asyncAction"
import { useHistory } from "react-router"

const RestPage: React.FC = () => {
    const state = useUserState().user
    const history = useHistory()
    if (!state.login.isLogin) history.push("/login")
    const dispatch = useDispatch()
    const [nowTime, setnowTime] = useState("")
    const componentDidMount = () => {
        setInterval(() => {
            return setnowTime(getTime());
        }, 1000)
    }
    const getTime = () => {
        let nowTime = new Date()
        let hours = nowTime.getHours()
        let minutes = nowTime.getMinutes()
        if (hours < 10 && minutes < 10) {
            return `0${hours}:0${minutes}`
        } else if (minutes < 10) {
            return `${hours}:0${minutes}`
        } else {
            return `${hours}:${minutes}`
        }
    }

    const finishWorkbuttonClick = () => {
        dispatch(postFinish({ userID: state.userID, timestamp: Math.floor(new Date().getTime() / 1000), status: 4 }))
    }

    const breakOutbuttonClick = () => {
        dispatch(postActivity({ userID: state.userID, timestamp: Math.floor(new Date().getTime() / 1000), status: 3 }))
    }
    componentDidMount()

    return (
        <div style={{ display: "flex", width: "100%", paddingTop: "20px", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
            <div style={{ width: "700px" }}>
                <div style={{ fontSize: 50, textAlign: "center", paddingBottom: "20px" }}>
                    <a>現在時刻</a> <a>{nowTime}</a>
                </div>
                <Timer></Timer>
                <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "30px" }}>
                    <Button
                        onClick={breakOutbuttonClick}
                        variant="contained"
                        style={{ backgroundColor: "#bb86fc", marginRight: "100px" }}
                    >
                        <Link to="/DataMeasurement" style={{ textDecoration: "none", color: "#fff", fontSize: 20 }}>休憩を終了する</Link>
                    </Button>
                    <Button
                        onClick={finishWorkbuttonClick}
                        variant="contained"
                        style={{ backgroundColor: "#bb86fc" }}
                    >
                        <Link to="/Result" style={{ textDecoration: "none", color: "#fff", fontSize: 20 }}>作業を終了する</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RestPage