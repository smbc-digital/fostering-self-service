import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute, updateFormStatus, FormName, updateForm } from '../../../../helpers'
import { Applicant } from '../../../Provider'

const AreYouEmployed = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant, secondApplicant,  onChangeStatus } = context
    const { firstName, lastName, areYouEmployed } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)

    const { yourEmploymentDetailsStatus } = context.statuses

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.YourEmploymentDetails, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })
            onChangeStatus('yourEmploymentDetailsStatus', status)
            setIsLoading(false)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }

    const options = [
        {
            label: 'Yes',
			id: 'are-you-employed-yes',
            name: 'areYouEmployed',
            value: 'true'
		},
		{
            label: 'No',
            id: 'are-you-employed-no',
            name: 'areYouEmployed',
            value: 'false'
		}
    ]

    const onSubmit = event => {
        event.preventDefault()

        if(currentApplicant === Applicant.FirstApplicant  && (!areYouEmployed.value || areYouEmployed.value == 'false') ){
            if(!secondApplicant){
                event.stopPropagation()
                event.preventDefault()

                handleFormUpdate(getPageRoute(6))
                return
            }
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(`${getPageRoute(4)}/second-applicant`)
            return
        } else if(areYouEmployed.value == 'true' || areYouEmployed.value == true) {
            if(currentApplicant === Applicant.SecondApplicant){
                history.push(`${getPageRoute(5)}/second-applicant`)
                return
            }
            history.push(getPageRoute(5))
        } else {
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(getPageRoute(6))
        }
    }
    useEffect(() => {
        updateFormStatus(
            FormName.YourEmploymentDetails,
            yourEmploymentDetailsStatus,
            newStatus => context.onChangeStatus('yourEmploymentDetailsStatus', newStatus))
    }, [])

    const radioValue = `${areYouEmployed.value}`
    return (
        <form onSubmit={onSubmit}>
            <h1>Your fostering journey</h1>
            <h2>Your employment details</h2>
            <p>{firstName.value} {lastName.value}</p>
            <RadioInputsContainer
                displayHeading
                header='Are you employed?'
                options={options}
                onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
                value={radioValue}
            />
            <Button label={radioValue === 'false' ? 'Save and next step' : 'Next step'} isValid isLoading={isLoading}/>
            <Anchor label='Back' history={history}/>
        </form>
    )
}

AreYouEmployed.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AreYouEmployed