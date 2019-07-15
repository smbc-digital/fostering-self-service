import React, { useContext, useEffect, useState, Fragment } from 'react'
import {
    Button, 
    Anchor, 
    RadioInputsContainer 
} from 'smbc-react-components'

import PropTypes from 'prop-types'
import { getCurrentApplicant, getPageRoute, updateForm, FormName, updateFormStatus } from 'helpers'
import { Context } from 'context';
import { Applicant } from '../../../Provider'

const AnyOverSixteens = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { anyChildrenOverSixteen, firstName, lastName } = context[currentApplicant]
    const { secondApplicant, onChangeApplicant, onChangeStatus, statuses: { childrenLivingAwayFromYourHomeStatus } } = context
    const [isLoading, setIsLoading] = useState(false)
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

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
            id: 'any-children-over-sixteen-yes',
            name: 'anyChildrenOverSixteen',
            value: 'true'
        },
        {
            label: 'No',
            id: 'any-children-over-sixteen-no',
            name: 'anyChildrenOverSixteen',
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

        if (currentApplicant == Applicant.FirstApplicant && (!anyChildrenOverSixteen.value || anyChildrenOverSixteen.value == 'false')) {
            if (!secondApplicant) {
                event.stopPropagation()
                event.preventDefault()

                handleFormUpdate(getPageRoute(21)) //this might need to be changed
                return
            }
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(`${getPageRoute(19)}/second-applicant`)
            return
        } else if (anyChildrenOverSixteen.value == 'true' || anyChildrenOverSixteen.value == true) {
            if (currentApplicant === Applicant.SecondApplicant) {
                history.push(`${getPageRoute(20)}/second-applicant`) 
                return
            }
            history.push(getPageRoute(20))    
        } else {
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(getPageRoute(21))  //this might need to be changed
        }
    }

    useEffect(() => {
        updateFormStatus(
            FormName.ChildrenLivingAwayFromYourHome,
            childrenLivingAwayFromYourHomeStatus,
            newStatus => onChangeStatus('childrenLivingAwayFromYourHomeStatus', newStatus))
    }, [])

    const onChange = (event, isValid) => onChangeApplicant(event, isValid, currentApplicant)
    
    const radioValue = `${anyChildrenOverSixteen.value}`
    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            <h3>{firstName.value} {lastName.value}</h3>
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    onChange={onChange}
                    value={radioValue}
                    displayHeading
                    header='Do you have any children aged 16 and over living away from your home?'
                    options={options}
                    value={radioValue}
                />
               <Button
					label={radioValue === 'false' ? 'Save and next step' : 'Next step'}
					isValid={!saveAndGoBackClicked}
					isLoading={isLoading && !saveAndGoBackClicked}
				/>
				<Anchor label='Back' history = { history } />
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

AnyOverSixteens.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AnyOverSixteens