import React, { Fragment, useContext, useEffect } from 'react'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TaskItem, TaskStatus } from 'smbc-react-components'
import { Context } from 'context'
import { AfterHomeVisitTimePeriod } from 'config'
import { 
	PARTNERSHIP_STATUS, 
	KNOWN_BY_ANOTHER_NAME, 
	ARE_YOU_EMPLOYED, 
	LANGUAGES_SPOKEN_IN_YOUR_HOME, 
	ABOUT_YOUR_HEALTH, 
	YOUR_INTEREST_IN_FOSTERING, 
	YOUR_HOUSEHOLD, 
	CHILDREN_UNDER_SIXTEEN_LIVING_AWAY,
	ADDRESS_HISTORY, 
	ABOUT_YOUR_GP, 
	FAMILY_REFERENCE,
	FOSTERING_HISTORY,
	RELATIONSHIP_TO_COUNCIL_EMPLOYEES
} from 'routes'

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
			route={KNOWN_BY_ANOTHER_NAME}
			status={displayStatus ? tellUsAboutYourselfStatus : undefined}
			name='More about you'
			disabled={disabled}
		/>
		<TaskLink
			route={ARE_YOU_EMPLOYED}
			status={displayStatus ? yourEmploymentDetailsStatus : undefined}
			name='Your employment details'
			disabled={disabled}
		/>
		<TaskLink
			route={LANGUAGES_SPOKEN_IN_YOUR_HOME}
			status={displayStatus ? languageSpokenInYourHomeStatus : undefined}
			name='Languages spoken in your home'
			disabled={disabled}
		/>
		{secondApplicant && <TaskLink
			route={PARTNERSHIP_STATUS}
			status={displayStatus ? yourPartnershipStatus : undefined}
			name='Your partnership status'
			disabled={disabled}
		/>
		}
		<TaskLink
			route={FOSTERING_HISTORY}
			status={displayStatus ? yourFosteringHistoryStatus : undefined}
			name='Your fostering history'
			disabled={disabled}
		/>
		<TaskLink
			route={ABOUT_YOUR_HEALTH}
			status={displayStatus ? yourHealthStatus : undefined}
			name='Your health'
			disabled={disabled}
		/>
		<TaskLink
			route={YOUR_INTEREST_IN_FOSTERING}
			status={displayStatus ? tellUsAboutYourInterestInFosteringStatus : undefined}
			name='Your interest in fostering'
			disabled={disabled}
		/>
		<TaskLink
			route={YOUR_HOUSEHOLD}
			status={displayStatus ? yourHouseholdStatus : undefined}
			name='Your household'
			disabled={disabled}
		/>
		<TaskLink
			route={CHILDREN_UNDER_SIXTEEN_LIVING_AWAY}
			status={displayStatus ? childrenLivingAwayFromYourHomeStatus : undefined}
			name='Children living away from your home'
			disabled={disabled}
		/>
	</Fragment>
}

const AdditionalInformationFormLinks = ({ disabled }) => {
	const { statuses: {
			addressHistoryStatus,
			gpDetailsStatus,
			referencesStatus,
			councillorsOrEmployeesStatus
		}
	} = useContext(Context)
	
	return (
		<Fragment>
		<p>After your home visit, you must give us more information so that we can carry out personal checks and contact your referees.</p>
		<TaskLink
			route={ADDRESS_HISTORY}
			status={addressHistoryStatus}
			name='Your address history'
			disabled={disabled}
		/>
		<TaskLink
			route={ABOUT_YOUR_GP}
			status={gpDetailsStatus}
			name='Your GP details'
			disabled={disabled}
		/>
		<TaskLink
			route={FAMILY_REFERENCE}
			status={referencesStatus}
			name='Personal references'
			disabled={disabled}
		/>
		<TaskLink
			route={RELATIONSHIP_TO_COUNCIL_EMPLOYEES}
			status={councillorsOrEmployeesStatus}
			name='Local councillors and council employees'
			disabled={disabled}
		/>
		</Fragment>
	)
}

const Start = () => {
	const { homeVisitDateTime, enableAdditionalInformationSection } = useContext(Context)
	const isPastHomeVisitDateTime = moment().subtract(AfterHomeVisitTimePeriod.value, AfterHomeVisitTimePeriod.unit).isSameOrAfter(moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm'))
	const disabled = moment().isSameOrAfter(moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').subtract(30, 'm'))
	const resultsRef = React.createRef()

	useEffect(() => {
		if (resultsRef.current)
			window.scrollTo({
				top: resultsRef.current.offsetTop,
				left: 0,
				behavior: 'smooth'
			})
	}, [])

	const tasks = [
		{
			title: 'Contact the fostering team',
			body: () => <p>Contact the fostering team to tell us that you’re interested in becoming a foster carer.</p>,
			status: TaskStatus.Completed
		},
		{
			title: 'Find out more about fostering',
			body: () => <p>Speak to the fostering team about your interest in fostering and arrange a home visit.</p>,
			status: TaskStatus.Completed
		},
		{
			title: 'Answer questions before your home visit',
			body: () => <FormLinks disabled={disabled} displayStatus={!isPastHomeVisitDateTime} />,
			displayHr: false,
			status: isPastHomeVisitDateTime ? TaskStatus.Completed : TaskStatus.None
		},
		{
			title: 'Home visit',
			body: () => <Fragment>
				{!isPastHomeVisitDateTime && homeVisitDateTime.value &&
					<p>Your home visit appointment will be on
						<strong>
							&thinsp;{moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').format('DD/MM/YYYY')}
						</strong>
						&thinsp;at&thinsp;
						<strong>
							{moment(homeVisitDateTime.value, 'DD/MM/YYYY HH:mm').format('HH:mm')}
						</strong>
					</p>}
				<p>Your social worker will come to your home to find out more about you and your reasons for wanting to become a foster carer. If you’ve answered the questions in section 3, you’ll talk more about them. </p>
			</Fragment>,
			status: isPastHomeVisitDateTime ? TaskStatus.Completed : TaskStatus.None
		},
		{
			title: 'Additional information',
			body: () => <AdditionalInformationFormLinks disabled={!enableAdditionalInformationSection.value}/>,
			status: enableAdditionalInformationSection.value ? TaskStatus.None : TaskStatus.CantStart,
			disabled: !enableAdditionalInformationSection.value,
			displayHr: false
		},
		{
			title: 'Next steps',
			body: () => <Fragment>
				<p>The fostering team will use the information that you’ve provided to carry out statutory checks and request personal and health references from your referees and GP.</p>
				<p>You’ll complete the assessment stage of your fostering journey where you’ll:</p>
				<ul>
					<li>attend training sessions, including the Skills to Foster course to help prepare you for becoming a foster carer</li>
					<li>have more meetings with your social worker so that they can find out more about you and your reasons for wanting to become a foster carer</li>
					<li>get to know current foster carers and other people who are starting their fostering journey</li>
				</ul>
				<p>You’ll then go to panel where a decision will be made about whether you can become a foster carer.</p>
				</Fragment>,
			disabled: !enableAdditionalInformationSection.value,
			displayHr: false
		}		
	]

	return (
		<Fragment>
			<h1>Start your fostering journey</h1>
			<ol className='task-item-list'>
				{tasks.map((task, index) => <li
					key={index}
					className={task.disabled ? 'disabled' : undefined}
					ref={index == 4 && enableAdditionalInformationSection.value ? resultsRef : null}>
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
	status: PropTypes.number,
	disabled: PropTypes.bool
}

FormLinks.propTypes = {
	disabled: PropTypes.bool,
	displayStatus: PropTypes.bool
}

AdditionalInformationFormLinks.propTypes = {
	disabled: PropTypes.bool
}

FormLinks.defaultProps = {
	disabled: false,
	displayStatus: true
}

export default Start
