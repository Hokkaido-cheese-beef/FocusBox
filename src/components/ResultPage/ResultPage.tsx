import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useWorkTimeState } from "../../reducer/workTime/selector";
import { useUserState } from "../../reducer/user/selector";
import { useHistory } from "react-router"
const ResultPage: React.FC = () => {
    const userState = useUserState().user
    const history = useHistory()
    if (!userState.login.isLogin) history.push("/login")
    const state = useWorkTimeState().workTime
    let startDate = new Date(state.start * 1000)
    let endDate = new Date(state.end * 1000)

    return (
        <div>
            <div style={{ display: "flex", width: "100%", paddingTop: "60px", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "700px" }}>
                    <div style={{ fontSize: 50, textAlign: "center" }}>
                        <p>お疲れ様でした！</p>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ width: "70%", fontSize: 35, display: "inline-block", textAlign: "left" }}>
                                <table>
                                    <tr>
                                        <th style={{ paddingRight: "80px" }} >作業開始時刻</th>
                                        <td>{`${startDate.getMonth() + 1}/${startDate.getDate()} ${startDate.getHours()}:${startDate.getMinutes()}`}</td>
                                    </tr>
                                    <tr>
                                        <th>作業終了時刻</th>
                                        <td>{`${endDate.getMonth() + 1}/${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}`}</td>
                                    </tr>
                                    <tr>
                                        <th>作業時間</th>
                                        <td>{`${Math.floor(state.workTime / 3600)}時間${Math.floor((state.workTime % 3600) / 60)}分`}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div style={{ display: "flex", width: "100%", paddingTop: "80px", justifyContent: "center", alignItems: "center" }}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#bb86fc", width: "480px" }}
                >
                    <Link to="" style={{ fontSize: 40, textDecoration: "none", color: "#fff" }}>ホーム画面に戻る</Link>
                </Button>
            </div>
        </div >
    )
}

export default ResultPage