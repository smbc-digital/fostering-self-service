import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TaskItem, TaskStatus } from 'smbc-react-components'
import { Context } from '../../../context'

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
	const { statuses: {
		//childrenLivingAwayFromYourHomeStatus,
		languageSpokenInYourHomeStatus,
		//tellUsAboutYourInterestInFosteringStatus,
		tellUsAboutYourselfStatus,
		yourEmploymentDetailsStatus,
		//yourFosteringHistoryStatus,
		//yourHealthStatus,
		//yourHouseholdStatus,
		yourPartnershipStatus
	} } = useContext(Context)
	return <Fragment>
		<p>To help prepare for your home visit, you can answer the questions in this section. This step is optional, however your fostering journey can be made simpler by telling us more about yourself. The questions will give you an idea of the conversation that you’ll have during your home visit and the social worker will be able to see your answers beforehand.</p>
		<TaskLink route='/fostering/known-by-another-name' status={tellUsAboutYourselfStatus} name='Tell us more about you' />
		<TaskLink route='/fostering/are-you-employed' status={yourEmploymentDetailsStatus} name='Your employment details' />
		<TaskLink route='#' status={languageSpokenInYourHomeStatus} name='Tell us more about languages that are spoken in your home' />
		<TaskLink route='#' status={yourPartnershipStatus} name='Your partnership status' />
	</Fragment>
}

const Start = () => {
	const tasks = [
		{
			title: 'Contact the fostering team',
			body: () => <p>Contact the fostering team to tell us that you’re interested in becoming a foster carer.</p>,
			status: 0
		},
		{
			title: 'Find out more about fostering',
			body: () => <p>Speak to the fostering team about your interest in fostering and arrange a home visit.</p>,
			status: 1
		},
		{
			title: 'Answer questions before your home visit',
			body: () => <FormLinks />,
			status: 1
		},
		{
			title: 'Home visit',
			body: () => <p>The social worker will come to your home to find out more about you and your reasons for wanting to become a foster carer. If you’ve answered the questions in the previous section, you’ll talk more about them. The home visit stage can be completed in one session but it may require more sessions to make sure that the social worker has all of the information that they need.</p>,
			disabled: true
		},
		{
			title: 'Additional information',
			body: () => <p>If you’ve been successful at your home visit, you’ll need to give us some more information so that you can move onto the next stage of your fostering journey.</p>,
			status: 2,
			disabled: true
		},
		{
			title: 'Assessment and training',
			body: () => <p>You’ll complete the assessment stage of your fostering journey and attend training sessions.</p>,
			status: 2,
			disabled: true
		},
		{
			title: 'Approval',
			body: () => <p>You’ll go to panel and a decision will be made about whether you can become a foster carer.</p>,
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
