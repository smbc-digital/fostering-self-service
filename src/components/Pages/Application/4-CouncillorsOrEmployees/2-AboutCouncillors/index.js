import React, { Fragment, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ComponentsList, TextInputContainer, TextAreaInputContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from 'context'
import { getCurrentApplicant, updateApplicationForm, ApplicationFormName } from 'helpers'
import { Applicant } from 'constants'
import { RELATIONSHIP_TO_COUNCIL_EMPLOYEES, START_PAGE } from 'routes'

const AboutCouncillors = ({ match, history }) => {
	const [isValid, setIsValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)
	const currentApplicant = getCurrentApplicant(match)
	const {
		firstApplicant,
		secondApplicant,
		onChangeTarget,
		onChangeStatus,
		[currentApplicant]: { councillorRelationshipDetails, firstName, lastName }
    } = useContext(Context)
    const isSavingAllowed = !secondApplicant || currentApplicant === Applicant.SecondApplicant

	useEffect(() => {
		let checkIsValid = councillorRelationshipDetails.value.length > 0 && councillorRelationshipDetails.value.every( _ => {
			return _.relationship !== '' 
			&& typeof _.relationship === 'string'
			&& _.councillorName !== ''
			&& typeof _.councillorName === 'string'
		})
		setIsValid(checkIsValid)
	}, [councillorRelationshipDetails])

	const onCouncillorChange = (values, isValid) => {
		onChangeTarget(
			{
				target: {
					name: 'councillorRelationshipDetails',
					value: values
				}
			},
			isValid,
			currentApplicant
		)
	}

	const renderComponent = (onChange, firstInputRef, values, index) => {
		const onComponentChange = ({ target: { name, value } }, isValid) => {
			onChange({ ...values, [name]: value }, isValid, index)
		}

		return (
			<Fragment>
				<TextInputContainer
					inputRef={firstInputRef}
					label="Name of councillor or council employee"
					validationMessage="Enter the name of the councillor or council employee"
					id="councillorName"
					type="text"
					maxLength={60}
					value={values.councillorName}
					onChange={onComponentChange}
				/>
				<TextAreaInputContainer
					id="relationship"
					label="Tell us how you know this person"
					value={values.relationship}
					onChange={onComponentChange}
					maxLength={500}
					maxLengthMessage="Your description can be up to 500 characters"
				/>
			</Fragment>
		)
	}

	const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

		try {
            const status = await updateApplicationForm(ApplicationFormName.Councillors, {
                firstApplicant,
                secondApplicant
            })
            onChangeStatus('councillorsOrEmployeesStatus', status)
			history.push(nextPageRoute)
		} catch (error) {
			history.push('/error')
		}
	}

	const onSubmit = event => {
        event.preventDefault()

		if (isSavingAllowed) {
			handleFormUpdate(START_PAGE)
			return
		}

		history.push(`${RELATIONSHIP_TO_COUNCIL_EMPLOYEES}/second-applicant`)
    }
    
    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()

        handleFormUpdate(START_PAGE)
    }

	return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Personal relationships with local councillors or council employees</h2>
			{secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
			<form onSubmit={onSubmit}>
				<ComponentsList
					onChange={onCouncillorChange}
					addItemMessage="Add another person"
					removeItemMessage="Remove person"
					showAddMoreButton={councillorRelationshipDetails.value.length < 4}
					renderComponent={renderComponent}
					values={councillorRelationshipDetails.value}
				/>
                <Button 
                    label={isSavingAllowed ? 'Save and next step' : 'Next step'} 
                    isValid={isValid && !saveAndGoBackClicked} 
                    isLoading={isLoading && !saveAndGoBackClicked} 
                />
				<Anchor label='Previous' history={history} />
                {isSavingAllowed && <Button
                    label="Save and go back to fostering area"
                    isValid={isValid}
                    isLoading={isLoading && saveAndGoBackClicked}
                    colour={!isValid ? 'disabled' : 'inverted'}
                    onButtonClick={event => {
                            setSaveAndGoBackClicked(true)
                            onSaveAndGoBackClick(event)
                        }
                    }
                    useLeftChevron
                />}
			</form>
		</Fragment>
	)
}

AboutCouncillors.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AboutCouncillors
