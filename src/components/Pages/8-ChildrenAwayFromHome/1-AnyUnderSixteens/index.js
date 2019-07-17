import React, { useContext, useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute, updateFormStatus, FormName, updateForm } from '../../../../helpers'
import { Applicant } from '../../../Provider'

const AnyUnderSixteens = ({ history, match }) => {
	const context = useContext(Context)
	const currentApplicant = getCurrentApplicant(match)
	const { anyChildrenUnderSixteen, firstName, lastName } = context[currentApplicant]
	const { secondApplicant, onChangeApplicant, onChangeStatus } = context
	const [isLoading, setIsLoading] = useState(false)
	const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

	const { childrenLivingAwayFromYourHomeStatus } = context.statuses

	const onChange = (event, isValid) => onChangeApplicant(event, isValid, currentApplicant)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.ChildrenLivingAwayFromYourHome, {
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

        await handleFormUpdate(getPageRoute(1))
    }

	const onSubmit = event => {
		event.preventDefault()

		if(currentApplicant == Applicant.FirstApplicant && (!anyChildrenUnderSixteen.value || anyChildrenUnderSixteen.value == 'false')) {
			if(!secondApplicant) {
				event.stopPropagation()
				event.preventDefault()

				handleFormUpdate(getPageRoute(19))
				return
			}
			event.stopPropagation()
            event.preventDefault()

			handleFormUpdate(`${getPageRoute(17)}/second-applicant`)
			return
		} else if(anyChildrenUnderSixteen.value == 'true' || anyChildrenUnderSixteen.value == true) {
			if(currentApplicant === Applicant.SecondApplicant) {
				history.push(`${getPageRoute(18)}/second-applicant`)
				return
			}
			history.push(getPageRoute(18))
		} else {
			event.stopPropagation()
			event.preventDefault()

			handleFormUpdate(getPageRoute(19))
		}
	}

	useEffect(() => {
        updateFormStatus(
            FormName.ChildrenLivingAwayFromYourHome,
            childrenLivingAwayFromYourHomeStatus,
            newStatus => onChangeStatus('childrenLivingAwayFromYourHomeStatus', newStatus))
	}, [])
	
	const radioValue = `${anyChildrenUnderSixteen.value}`

	return(
		<Fragment>
			<h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <form onSubmit={onSubmit}>
				<RadioInputsContainer
					displayHeading
					header='Do you have any children under 16 who live away from your home?'
					options={options}
					onChange={onChange}
					value={radioValue}
				/>
				<Button
					label={radioValue === 'true' ? 'Next step' : 'Save and next step'}
					isValid={!saveAndGoBackClicked}
					isLoading={isLoading && !saveAndGoBackClicked}
				/>
				<Anchor label='Back' history={history} />
				<Button
					label="Save and go back to fostering area"
					isValid={!isLoading && !saveAndGoBackClicked && radioValue !== 'true'}
					isLoading={isLoading && saveAndGoBackClicked}
					colour={radioValue !== 'true' ? 'inverted' : 'disabled'}
					onButtonClick={event => {
							setSaveAndGoBackClicked(true)
							onSaveAndGoBackClick(event)
						}
					}
					useLeftChevron={true} />
			</form>
		</Fragment>
	)
}

AnyUnderSixteens.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AnyUnderSixteens