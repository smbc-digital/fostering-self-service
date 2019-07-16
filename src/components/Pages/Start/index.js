import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TaskItem, TaskStatus } from 'smbc-react-components'
import { Context } from '../../../context'
import { getPageRoute } from '../../../helpers'

const TaskLink = ({ route, name, status }) => {

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
		<Link to={route}>{name}</Link>
		{renderStatus()}
	</div>
}

const FormLinks = () => {
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
		<TaskLink route='/fostering/known-by-another-name' status={tellUsAboutYourselfStatus} name='Tell us more about you' />
		<TaskLink route='/fostering/are-you-employed' status={yourEmploymentDetailsStatus} name='Your employment details' />
		<TaskLink route='/fostering/languages-spoken-in-your-home' status={languageSpokenInYourHomeStatus} name='Tell us more about languages that are spoken in your home' />
		{secondApplicant && <TaskLink route={getPageRoute(7)} status={yourPartnershipStatus} name='Your partnership status' />}
		<TaskLink route='/fostering/your-fostering-history' status={yourFosteringHistoryStatus} name='Your fostering history' />
		<TaskLink route='/fostering/about-your-health' status={yourHealthStatus} name='Your health' />
		<TaskLink route={getPageRoute(12)} status={tellUsAboutYourInterestInFosteringStatus} name='Tell us about your interest in fostering' />
		<TaskLink route={getPageRoute(23)} status={yourHouseholdStatus} name='Your household' />
		<TaskLink route={getPageRoute(17)} status={childrenLivingAwayFromYourHomeStatus} name='Children living away from your home' />
	</Fragment>
}

const Start = () => {
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
			body: () => <FormLinks />,
			displayHr: false
		},
		{
			title: 'Home visit',
			body: () => <p>Your social worker will come to your home to find out more about you and your reasons for wanting to become a foster carer. If you’ve answered the questions in section 3, you’ll talk more about them. </p>,
			disabled: true
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
			<h1>Start your fostering journey</h1>
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
	status: PropTypes.object
}

export default Start
