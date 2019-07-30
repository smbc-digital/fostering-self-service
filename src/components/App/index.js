import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Switch, Route, Redirect } from 'react-router'
import { getPageRoute } from 'helpers/pagehelper'
import { ErrorPage } from 'smbc-react-components'
import { Context } from 'context'
import Start from '../Pages/Start'
import { KnownByAnotherName, MoreAboutYou } from '../Pages/HomeVisit/1-TellUsAboutYou'
import { AreYouEmployed, EmploymentDetails } from '../Pages/HomeVisit/2-YourEmploymentDetails'
import LanguagesSpokenInYourHome from '../Pages/HomeVisit/3-LanguagesSpokenInYourHome'
import { AreYouMarried, MarriageDate, MovedInTogetherDate } from '../Pages/HomeVisit/4-PartnershipStatus'
import { HaveYouPreviouslyApplied } from '../Pages/HomeVisit/5-YourFosteringHistory'
import YourHealth from '../Pages/HomeVisit/6-YourHealth'
import { AboutYourInterest, TypesOfFostering } from '../Pages/HomeVisit/7-InterestInFostering'
import { AnyUnderSixteens, AboutUnderSixteens, AnyOverSixteens, AboutOverSixteens } from '../Pages/HomeVisit/8-ChildrenAwayFromHome'
import { AnyPeopleInYourHousehold, PeopleInYourHousehold, DoYouHaveAnyPets } from '../Pages/HomeVisit/10-YourHousehold'
import { YourGpDetails } from '../Pages/Application'

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

const App = () => {
	const { homeVisitDateTime } = useContext(Context)
	const disabledHomeVisitRoutes = moment().isSameOrAfter(moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').subtract(30, 'm'))

	return (
		<Switch>
			<Route exact path={getPageRoute(1)} component={Start} />
			<Route exact path="/error" component={ErrorPage} />
			{disabledHomeVisitRoutes || <Fragment>
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
				<Route exact path={getPageRoute(14)} component={AnyPeopleInYourHousehold} />
				<Route exact path={getPageRoute(15)} component={PeopleInYourHousehold} />
				<Route exact path={getPageRoute(16)} component={DoYouHaveAnyPets} />
				<Route exact path={`${getPageRoute(17)}/(|second-applicant)?`} component={AnyUnderSixteens} />
				<Route exact path={`${getPageRoute(18)}/(|second-applicant)?`} component={AboutUnderSixteens} />
				<Route exact path={`${getPageRoute(19)}/(|second-applicant)?`} component={AnyOverSixteens} />
				<Route exact path={`${getPageRoute(20)}/(|second-applicant)?`} component={AboutOverSixteens} />
				<Route exact path={`${getPageRoute(22)}/(|second-applicant)?`} component={YourGpDetails} />
			</Fragment>
			}
			<Redirect to={getPageRoute(1)} />
		</Switch>
	)
}

JointApplicationOnlyRoute.propTypes = {
	component: PropTypes.element
}

export default App