import Title from "./Title/Title";
import DeviceSettingPage from "./DeviceSettingPage/DeviceSettingPage";
import DataMeasurementPage from "./DataMeasurementPage/DataMeasurementPage";
import RestPage from "./RestPage/RestPage";
import ResultPage from "./ResultPage/ResultPage";
import { Route, HashRouter, Switch } from "react-router-dom";
import Redirect from "./utilComponent/Redirect";
const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Title} />
        <Route exact path='/login' component={Title} />
        <Route exact path='/DeviceSetting' component={DeviceSettingPage} />
        <Route exact path='/DataMeasurement' component={DataMeasurementPage} />
        <Route exact path='/Rest' component={RestPage} />
        <Route exact path='/Result' component={ResultPage} />
        <Route component={Redirect} />
      </Switch>
    </HashRouter>
  );
};
export default App