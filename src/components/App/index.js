import React from 'react'
import { Switch, Route } from 'react-router'
import { getPageRoute } from '../../helpers/pagehelper'
import { ErrorPage } from 'smbc-react-components'
import Start from '../Pages/Start'
import { KnownByAnotherName, MoreAboutYou } from '../Pages/1-TellUsAboutYou'
import { AreYouEmployed, EmploymentDetails } from '../Pages/2-YourEmploymentDetails'

const App = () => <Switch>
    <Route exact path={getPageRoute(1)} component={Start} />
    <Route exact path={`${getPageRoute(2)}/(|second-applicant)?`} component={KnownByAnotherName} />
    <Route exact path={`${getPageRoute(3)}/(|second-applicant)?`} component={MoreAboutYou} />
    <Route exact path={`${getPageRoute(4)}/(|second-applicant)?`} component={AreYouEmployed} />
    <Route exact path={`${getPageRoute(5)}/(|second-applicant)?`} component={EmploymentDetails} />
    <Route exact path="/error" component={ErrorPage} />
</Switch>

export default App