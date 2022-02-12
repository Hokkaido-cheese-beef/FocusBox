import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
const Redirect: React.FC = () => {
    return (
        <div>
            お探しのページが見つかりません...<br />
            <Button
                variant="contained"
                style={{ backgroundColor: "#bb86fc", marginRight: "30px", marginTop: "20px" }}
            >
                <Link to="/login" style={{ textDecoration: "none", color: "#fff", fontSize: 20 }}>ログインページ</Link>
            </Button>
            <br />
            <Button
                variant="contained"
                style={{ backgroundColor: "#bb86fc", marginTop: "20px" }}
            >
                <Link to="/DeviceSetting" style={{ textDecoration: "none", color: "#fff", fontSize: 20 }}>デバイス設定ページ</Link><br />
            </Button>
        </div>
    )
}
export default Redirect