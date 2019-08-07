import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from 'context'
import { 
    getCurrentApplicant, 
    updateFormStatus, 
    HomeVisitFormName, 
    StageName, 
    updateHomeVisitForm 
} from 'helpers'
import { Applicant } from 'components/Provider'
import { START_PAGE, LANGUAGES_SPOKEN_IN_YOUR_HOME, ARE_YOU_EMPLOYED, EMPLOYMENT_DETAILS } from 'routes'

const AreYouEmployed = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeTarget, secondApplicant,  onChangeStatus } = context
    const { firstName, lastName, areYouEmployed } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

    const { yourEmploymentDetailsStatus } = context.statuses

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.YourEmploymentDetails, {
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

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(START_PAGE)
    }

    const onSubmit = event => {
        event.preventDefault()

        if(currentApplicant === Applicant.FirstApplicant  && (!areYouEmployed.value || areYouEmployed.value == 'false') ){
            if(!secondApplicant){
                event.stopPropagation()
                event.preventDefault()

                handleFormUpdate(LANGUAGES_SPOKEN_IN_YOUR_HOME)
                return
            }
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(`${ARE_YOU_EMPLOYED}/second-applicant`)
            return
        } else if(areYouEmployed.value == 'true' || areYouEmployed.value == true) {
            if(currentApplicant === Applicant.SecondApplicant){
                history.push(`${EMPLOYMENT_DETAILS}/second-applicant`)
                return
            }
            history.push(EMPLOYMENT_DETAILS)
        } else {
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(LANGUAGES_SPOKEN_IN_YOUR_HOME)
        }
    }
    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.YourEmploymentDetails,
            stage: StageName.HomeVisit,
            currentStatus: yourEmploymentDetailsStatus,
            setStatus: newStatus => context.onChangeStatus('yourEmploymentDetailsStatus', newStatus)
        })
    }, [])

    const onChange = (event, isValid) => {
        return onChangeTarget(event, isValid, currentApplicant)
    }

    const radioValue = `${areYouEmployed.value}`
    return (
        <form onSubmit={onSubmit}>
            <h1>Your fostering journey</h1>
            <h2>Your employment details</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <RadioInputsContainer
                displayHeading
                header='Are you employed?'
                options={options}
                onChange={onChange}
                value={radioValue}
            />

        <Button
            label={radioValue === 'false' ? 'Save and next step' : 'Next step'}
            isValid={!saveAndGoBackClicked}
            isLoading={isLoading && !saveAndGoBackClicked}
        />
        <Anchor label='Back' history={history} />
        <Button
            label="Save and go back to fostering area"
            isValid={!isLoading && !saveAndGoBackClicked && radioValue === 'false'}
            isLoading={isLoading && saveAndGoBackClicked}
            colour={radioValue !== 'false' ? 'disabled' : 'inverted'}
            onButtonClick={event => {
                    setSaveAndGoBackClicked(true)
                    onSaveAndGoBackClick(event)
                }
            }
            useLeftChevron={true} />
        </form>
    )
}

AreYouEmployed.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AreYouEmployed