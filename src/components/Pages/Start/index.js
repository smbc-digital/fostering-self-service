import React, { Fragment, useContext } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TaskItem, TaskStatus } from 'smbc-react-components'
import { Context } from '../../../context'
import { getPageRoute } from '../../../helpers'
import { AfterHomeVisitTimePeriod } from 'config'

const TaskLink = ({ route, name, status, disabled }) => {

	const renderStatus = () => {
		switch (status) {
			case TaskStatus.Completed:
				return <span className='status-completed'>Completed</span>
			case TaskStatus.NotCompleted:
				return <span className='status-not-completed'>Not completed</span>
			default:
				return
		}
	}

	return <div className='anchor-with-status'>
		{disabled ? <p>{name}</p> : <Link to={route}>{name}</Link>}
		{renderStatus()}
	</div>
}

const FormLinks = ({ disabled, displayStatus }) => {
	const {
		statuses: {
			childrenLivingAwayFromYourHomeStatus,
			languageSpokenInYourHomeStatus,
			tellUsAboutYourInterestInFosteringStatus,
			tellUsAboutYourselfStatus,
			yourEmploymentDetailsStatus,
			yourFosteringHistoryStatus,
			yourHealthStatus,
			yourHouseholdStatus,
			yourPartnershipStatus
		},
		secondApplicant
	} = useContext(Context)

	return <Fragment>
		<p>You can answer the questions in this section to help you to prepare for your home visit. This step is optional however, your fostering journey can be made simpler by telling us more about yourself. You can make changes to your answers up to 30 minutes before your home visit and your social worker will be able to see your answers before your appointment.</p>
		<TaskLink
			route='/fostering/known-by-another-name'
			status={displayStatus ? tellUsAboutYourselfStatus : undefined}
			name='Tell us more about you'
			disabled={disabled}
		/>
		<TaskLink
			route='/fostering/are-you-employed'
			status={displayStatus ? yourEmploymentDetailsStatus : undefined}
			name='Your employment details'
			disabled={disabled}
		/>
		<TaskLink
			route='/fostering/languages-spoken-in-your-home'
			status={displayStatus ? languageSpokenInYourHomeStatus : undefined}
			name='Tell us about the languages that are spoken in your home'
			disabled={disabled}
		/>
		{secondApplicant && <TaskLink
			route={getPageRoute(7)}
			status={displayStatus ? yourPartnershipStatus : undefined}
			name='Your partnership status'
			disabled={disabled} 
			/>
		}
		<TaskLink
			route='/fostering/your-fostering-history'
			status={displayStatus ? yourFosteringHistoryStatus : undefined}
			name='Your fostering history'
			disabled={disabled}
		/>
		<TaskLink
			route='/fostering/about-your-health'
			status={displayStatus ? yourHealthStatus : undefined}
			name='Your health'
			disabled={disabled}
		/>
		<TaskLink
			route={getPageRoute(12)}
			status={displayStatus ? tellUsAboutYourInterestInFosteringStatus : undefined}
			name='Tell us about your interest in fostering'
			disabled={disabled}
		/>
		<TaskLink
			route={getPageRoute(14)}
			status={displayStatus ? yourHouseholdStatus : undefined}
			name='Your household'
			disabled={disabled}
		/>
		<TaskLink
			route={getPageRoute(17)}
			status={displayStatus ? childrenLivingAwayFromYourHomeStatus : undefined}
			name='Children living away from your home'
			disabled={disabled}
		/>
	</Fragment>
}

const Start = () => {
	const { homeVisitDateTime } = useContext(Context)
	const isPastHomeVisitDateTime = moment().subtract(AfterHomeVisitTimePeriod.value, AfterHomeVisitTimePeriod.unit).isSameOrAfter(moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm'))
	const disabled = moment().isSameOrAfter(moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').subtract(30, 'm'))

	const tasks = [
		{
			title: 'Contact the fostering team',
			body: () => <p>Contact the fostering team to tell us that you’re interested in becoming a foster carer.</p>,
			status: 1
		},
		{
			title: 'Find out more about fostering',
			body: () => <p>Speak to the fostering team about your interest in fostering and arrange a home visit.</p>,
			status: 1
		},
		{
			title: 'Answer questions before your home visit',
			body: () => <FormLinks disabled={disabled} displayStatus={!isPastHomeVisitDateTime}/>,
			displayHr: false,
			status: isPastHomeVisitDateTime ? 1 : undefined
		},
		{
			title: 'Home visit',
			body: () => <Fragment>
				{!isPastHomeVisitDateTime && homeVisitDateTime.value && 
					<p>Your home visit appointment will be on  
						<strong>
							&thinsp;{moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY')}
							&thinsp;at&thinsp;{moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').format('HH:mm')}
						</strong>
					</p>}
				<p>Your social worker will come to your home to find out more about you and your reasons for wanting to become a foster carer. If you’ve answered the questions in section 3, you’ll talk more about them. </p>
			</Fragment>,
			disabled: true,
			status: isPastHomeVisitDateTime ? 1 : undefined
		},
		{
			title: 'Additional information',
			body: () => <p>After your home visit, you’ll need to give us more information so that we can carry out personal checks and contact your referees.</p>,
			status: 3,
			disabled: true
		},
		{
			title: 'Assessment and training',
			body: () => <p>Complete the assessment stage of your fostering journey and attend training sessions.</p>,
			status: 3,
			disabled: true
		},
		{
			title: 'Approval',
			body: () => <p>Go to panel and a decision will be made about whether you can become a foster carer.</p>,
			disabled: true
		}
	]

	return (
		<Fragment>
			<div className='grid-100'>
				<h1>Start your fostering journey</h1>
			</div>
			<ol className='task-item-list'>
				{tasks.map((task, index) => <li
					key={index}
					className={task.disabled ? 'disabled' : undefined}>
					<TaskItem
						key={index}
						title={task.title}
						body={task.body}
						status={task.status}
						displayHr={task.displayHr}
						renderStatus={task.renderStatus}
					/>
				</li>)}
			</ol>
		</Fragment>
	)
}

Start.propTypes = {
	history: PropTypes.object
}

TaskLink.propTypes = {
	route: PropTypes.string,
	name: PropTypes.string,
	status: PropTypes.object,
	disabled: PropTypes.bool
}

FormLinks.propTypes = {
	disabled: PropTypes.bool,
	displayStatus: PropTypes.bool
}

FormLinks.defaultProps = {
	disabled: false,
	displayStatus: true
}

export default Start
