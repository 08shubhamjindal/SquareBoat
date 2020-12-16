import Home from './Component/Home'
import Login from './Component/Login'
import SignUp from './Component/SignUp'
import CandidateDashBoard from './Component/CandidateDashBoard';
import RecuirterDashBoard from './Component/RecuirterDashBoard';

import {Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Switch>
             <Route exact path='/' component={Home}/>
             <Route exact path='/login' component={Login}/>
             <Route exact path='/signUp' component={SignUp}/>
             <Route exact path='/candidateDashboard' component={CandidateDashBoard}/>
             <Route exact path='/recuirterDashboard' component={RecuirterDashBoard}/>
      </Switch>
    </div>
  );
}
export default App;