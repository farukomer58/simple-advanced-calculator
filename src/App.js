import './App.css';
import ErrorPage from "./components/ErrorPage";
import CalculatorStraight from "./CalculatorStraight";
import Calculator from "./Calculator";
import { Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Switch>
      <Route path="/" exact><CalculatorStraight /></Route>
      <Route path="/context" exact><Calculator/></Route>
      <Route path='*' exact={true} component={ErrorPage} />
    </Switch>
  )
}

export default App;
