import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { Switch, Route, Redirect } from 'react-router'
import { ErrorPage } from 'smbc-react-components'
import { Context } from 'context'
import { RouterConfig, START_PAGE } from 'routes'
import { StageName } from 'helpers'

const JointApplicationOnlyRoute = ({ component: Component, ...props }) => {
	const { secondApplicant } = useContext(Context)

	return (
		<Route
			{...props}
			render={props =>
				secondApplicant
					? <Component {...props} />
					: <Redirect to={START_PAGE} />}
		/>
	)
}

const App = () => {
	const { homeVisitDateTime } = useContext(Context)
	const disabledHomeVisitRoutes = moment().isSameOrAfter(moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').subtract(30, 'm'))

	return (
		<Switch>
			{RouterConfig.map(route => {
				if (disabledHomeVisitRoutes && route.stage === StageName.HomeVisit) {
					return null
				}

				const path = route.bothApplicants ? `${route.path}/(|second-applicant)?` : route.path

				if (route.jointApplicantOnly) {
					return <JointApplicationOnlyRoute {...route} path={path} key={path} /> 
				}

				return <Route {...route} path={path} key={path} />
			})}
			<Route path='/error' component={ErrorPage} />
			<Redirect to={START_PAGE} />
		</Switch>
	)
}

JointApplicationOnlyRoute.propTypes = {
	component: PropTypes.func
}

export default App