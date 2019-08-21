import React, { useContext, useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from 'context'
import { getCurrentApplicant, updateFormStatus, HomeVisitFormName, updateHomeVisitForm, StageName } from 'helpers'
import { Applicant } from 'constants'
import {
	START_PAGE,
	CHILDREN_OVER_SIXTEEN_LIVING_AWAY,
	CHILDREN_UNDER_SIXTEEN_LIVING_AWAY,
	ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY
} from 'routes'

const AnyUnderSixteens = ({ history, match }) => {
	const context = useContext(Context)
	const currentApplicant = getCurrentApplicant(match)
	const { anyChildrenUnderSixteen, firstName, lastName } = context[currentApplicant]
	const { secondApplicant, onChangeTarget, onChangeStatus } = context
	const [isLoading, setIsLoading] = useState(false)
	const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

	const { childrenLivingAwayFromYourHomeStatus } = context.statuses

	const onChange = (event, isValid) => onChangeTarget(event, isValid, currentApplicant)

	const handleFormUpdate = async nextPageRoute => {
		setIsLoading(true)

		try {
			const status = await updateHomeVisitForm(HomeVisitFormName.ChildrenLivingAwayFromYourHome, {
				firstApplicant: context.firstApplicant,
				secondApplicant: context.secondApplicant
			})
			onChangeStatus('childrenLivingAwayFromYourHomeStatus', status)
			setIsLoading(false)
			history.push(nextPageRoute)
		} catch (error) {
			history.push('/error')
		}
	}

	const options = [
		{
			label: 'Yes',
			id: 'any-children-under-sixteen-yes',
			name: 'anyChildrenUnderSixteen',
			value: 'true'
		},
		{
			label: 'No',
			id: 'any-children-under-sixteen-no',
			name: 'anyChildrenUnderSixteen',
			value: 'false'
		}
	]

	const onSaveAndGoBackClick = async event => {
		event.stopPropagation()
		event.preventDefault()

		await handleFormUpdate(START_PAGE)
	}

	const onSubmit = event => {
		event.preventDefault()

		if (
			currentApplicant == Applicant.FirstApplicant &&
			(!anyChildrenUnderSixteen.value || anyChildrenUnderSixteen.value == 'false')
		) {
			if (!secondApplicant) {
				event.stopPropagation()
				event.preventDefault()

				handleFormUpdate(CHILDREN_OVER_SIXTEEN_LIVING_AWAY)
				return
			}
			event.stopPropagation()
			event.preventDefault()

			handleFormUpdate(`${CHILDREN_UNDER_SIXTEEN_LIVING_AWAY}/second-applicant`)
			return
		} else if (anyChildrenUnderSixteen.value == 'true' || anyChildrenUnderSixteen.value == true) {
			if (currentApplicant === Applicant.SecondApplicant) {
				history.push(`${ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY}/second-applicant`)
				return
			}
			history.push(ABOUT_CHILDREN_UNDER_SIXTEEN_LIVING_AWAY)
		} else {
			event.stopPropagation()
			event.preventDefault()

			handleFormUpdate(CHILDREN_OVER_SIXTEEN_LIVING_AWAY)
		}
	}

	useEffect(() => {
		updateFormStatus({
			form: HomeVisitFormName.ChildrenLivingAwayFromYourHome,
			stage: StageName.HomeVisit,
			currentStatus: childrenLivingAwayFromYourHomeStatus,
			setStatus: newStatus => onChangeStatus('childrenLivingAwayFromYourHomeStatus', newStatus)
		})
	}, [])

	const radioValue = `${anyChildrenUnderSixteen.value}`

	return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Children living away from your home</h2>
			{secondApplicant && (
				<h3>
					{firstName.value} {lastName.value}
				</h3>
			)}
			<form onSubmit={onSubmit}>
				<RadioInputsContainer
					displayHeading
					header="Do you have any children under 16 living away from your home?"
					options={options}
					onChange={onChange}
					value={radioValue}
				/>
				<Button
					label={radioValue === 'true' ? 'Next step' : 'Save and next step'}
					isValid={!saveAndGoBackClicked}
					isLoading={isLoading && !saveAndGoBackClicked}
				/>
				<Anchor label="Previous" history={history} />
				<Button
					label="Save and go back to fostering area"
					isValid={!isLoading && !saveAndGoBackClicked && radioValue !== 'true'}
					isLoading={isLoading && saveAndGoBackClicked}
					colour='inverted'
					onButtonClick={event => {
						setSaveAndGoBackClicked(true)
						onSaveAndGoBackClick(event)
					}}
					useLeftChevron={true}
				/>
			</form>
		</Fragment>
	)
}

AnyUnderSixteens.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object
}

export default AnyUnderSixteens
