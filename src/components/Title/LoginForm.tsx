import { useEffect, useState } from "react"
import { postLogin } from "../../reducer/user/asyncAction"
import { useDispatch } from "react-redux"
import { OutWrapper, Styledlabel } from "./styledComponents"
import { useUserState } from "../../reducer/user/selector"
import { useHistory } from "react-router"
import { Button } from "@material-ui/core"
const LoginForm: React.FC = () => {
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [userIdIsEmptyMsg, setUserIdEmptyMsg] = useState("")
    const [passwordIsEmptyMsg, setPasswordEmptyMsg] = useState("")
    const UserState = useUserState()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (UserState.user.login.isLogin === true) {
            history.push("/DeviceSetting")
        }
    }, [UserState.user.login.isLogin, history])

    const handleButton = () => {
        if (checkFormIsEmpty()) {
            dispatch(postLogin({ userID: userId, password: password }))
        }
    }

    const checkFormIsEmpty = () => {
        setUserIdEmptyMsg(userId === "" ? "未入力です" : "")
        setPasswordEmptyMsg(password === "" ? "未入力です" : "")
        if (userId !== "" && password !== "") return true
    }
    return (
        <OutWrapper>
            <div>
                <div>
                    <img
                        style={{ width: "200px", height: "200px", marginBottom: "30px" }}
                        src="https://firebasestorage.googleapis.com/v0/b/chattry-50a0f.appspot.com/o/FocusBox_backclean.png?alt=media&token=90aaec4d-720b-40f1-b1c0-369abc44b323" alt="サービスロゴ" />
                </div>
                <div style={{ color: "black", textAlign: "center" }}>
                    {UserState.user.login.errorMsg === "" ? "" : "ログインできません"}
                </div>
                <div >
                    <Styledlabel >ユーザーID  {userIdIsEmptyMsg}</Styledlabel>
                    <input type="text" onChange={(e) => setUserId(e.target.value)} style={{ width: "200px" }}></input>
                </div>
                <div>
                    <Styledlabel>パスワード  {passwordIsEmptyMsg}</Styledlabel>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} style={{ width: "200px" }}></input>
                </div>
                <div>
                    <Button onClick={handleButton} variant="contained" style={{
                        textAlign: "center", backgroundColor: "#bb86fc", height: "3rem", color: "white", width: "10rem", margin: "30px auto", display: "block"
                    }}>接続を確認</Button>
                </div>
            </div>
        </OutWrapper>
    )
}

export default LoginForm