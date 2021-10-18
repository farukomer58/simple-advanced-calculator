import './App.css';
import ErrorPage from "./components/ErrorPage";
import Calculator from "./Calculator";
import { Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Switch>
      <Route path="/" exact><Calculator /></Route>
      <Route path='*' exact={true} component={ErrorPage} />
    </Switch>
  )
}

export default App;
