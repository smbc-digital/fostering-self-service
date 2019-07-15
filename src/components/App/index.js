import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router'
import { getPageRoute } from 'helpers/pagehelper'
import { ErrorPage } from 'smbc-react-components'
import { Context } from 'context'
import Start from '../Pages/Start'
import { KnownByAnotherName, MoreAboutYou } from '../Pages/1-TellUsAboutYou'
import { AreYouEmployed, EmploymentDetails } from '../Pages/2-YourEmploymentDetails'
import LanguagesSpokenInYourHome from '../Pages/3-LanguagesSpokenInYourHome'
import { AreYouMarried, MarriageDate, MovedInTogetherDate } from '../Pages/4-PartnershipStatus'
import { HaveYouPreviouslyApplied } from '../Pages/5-YourFosteringHistory'
import YourHealth from '../Pages/6-YourHealth'
import { AboutYourInterest, TypesOfFostering } from '../Pages/7-InterestInFostering'
import { AnyUnderSixteens, AboutUnderSixteens, AnyOverSixteens, AboutOverSixteens } from '../Pages/8-ChildrenAwayFromHome'
import { AnyPeopleInYourHousehold, PeopleInYourHousehold, DoYouHaveAnyPets } from '../Pages/10-YourHousehold'

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

const App = () => (
	<Switch>
		<Route exact path={getPageRoute(1)} component={Start} />
		<Route exact path={`${getPageRoute(2)}/(|second-applicant)?`} component={KnownByAnotherName} />
		<Route exact path={`${getPageRoute(3)}/(|second-applicant)?`} component={MoreAboutYou} />
		<Route exact path={`${getPageRoute(4)}/(|second-applicant)?`} component={AreYouEmployed} />
		<Route exact path={`${getPageRoute(5)}/(|second-applicant)?`} component={EmploymentDetails} />
		<Route exact path={getPageRoute(6)} component={LanguagesSpokenInYourHome} />
		<JointApplicationOnlyRoute exact path={getPageRoute(7)} component={AreYouMarried} />
		<JointApplicationOnlyRoute exact path={getPageRoute(8)} component={MarriageDate} />
		<JointApplicationOnlyRoute exact path={getPageRoute(9)} component={MovedInTogetherDate} />
		<Route exact path={`${getPageRoute(10)}/(|second-applicant)?`} component={HaveYouPreviouslyApplied} />
		<Route exact path={`${getPageRoute(11)}/(|second-applicant)?`} component={YourHealth} />
		<Route exact path={getPageRoute(12)} component={AboutYourInterest} />
		<Route exact path={getPageRoute(13)} component={TypesOfFostering} />
		<Route exact path={`${getPageRoute(17)}/(|second-applicant)?`} component={AnyUnderSixteens} />
		<Route exact path={`${getPageRoute(18)}/(|second-applicant)?`} component={AboutUnderSixteens} />
		<Route exact path={`${getPageRoute(19)}/(|second-applicant)?`} component={AnyOverSixteens} />
		<Route exact path={`${getPageRoute(20)}/(|second-applicant)?`} component={AboutOverSixteens} />
		<Route exact path={getPageRoute(23)} component={AnyPeopleInYourHousehold} />
		<Route exact path={getPageRoute(24)} component={PeopleInYourHousehold} />
		<Route exact path={getPageRoute(25)} component={DoYouHaveAnyPets} />
		<Route exact path="/error" component={ErrorPage} />
	</Switch>
)

JointApplicationOnlyRoute.propTypes = {
    component: PropTypes.element
}

export default App