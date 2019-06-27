import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { getPageRoute } from 'helpers/pagehelper'
import { ErrorPage } from 'smbc-react-components'
import { Context } from 'context'
import Start from '../Pages/Start'
import { KnownByAnotherName, MoreAboutYou } from '../Pages/1-TellUsAboutYou'
import { AreYouEmployed, EmploymentDetails } from '../Pages/2-YourEmploymentDetails'
import LanguagesSpokenInYourHome from '../Pages/3-LanguagesSpokenInYourHome'
import { HaveYouPreviouslyApplied } from '../Pages/5-YourFosteringHistory'
import { AreYouMarried, MarriageDate, MovedInTogetherDate } from '../Pages/4-PartnershipStatus'

const JointApplicationOnlyRoute = ({ component: Component, ...props }) => {
    const { secondApplicant } = useContext(Context)
    
    return ( 
        <Route 
            {...props} 
            render={props => 
                secondApplicant 
                ? <Component {...props} /> 
                : <Redirect to={getPageRoute(1)} />} 
        />
    )
}

const App = () => <Switch>
    <Route exact path={getPageRoute(1)} component={Start} />
    <Route exact path={`${getPageRoute(2)}/(|second-applicant)?`} component={KnownByAnotherName} />
    <Route exact path={`${getPageRoute(3)}/(|second-applicant)?`} component={MoreAboutYou} />
    <Route exact path={`${getPageRoute(4)}/(|second-applicant)?`} component={AreYouEmployed} />
    <Route exact path={`${getPageRoute(5)}/(|second-applicant)?`} component={EmploymentDetails} />
    <Route exact path={getPageRoute(6)} component={LanguagesSpokenInYourHome} />
    <Route exact path={getPageRoute(7)} component={AreYouMarried} />
    <Route exact path={getPageRoute(8)} component={MarriageDate} />
    <Route exact path={getPageRoute(9)} component={MovedInTogetherDate} />
    <Route exact path={`${getPageRoute(10)}/(|second-applicant)?`} component={HaveYouPreviouslyApplied} />
    <Route exact path="/error" component={ErrorPage} />
</Switch>

export default App