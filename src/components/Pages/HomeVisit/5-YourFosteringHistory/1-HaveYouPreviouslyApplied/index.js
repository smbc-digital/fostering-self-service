import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {RadioInputsContainer} from 'smbc-react-components'
import { Context } from 'context'
import { getCurrentApplicant, updateHomeVisitForm, HomeVisitFormName } from 'helpers'
import { Applicant } from 'constants'
import SubmitButton from 'components/SubmitButton'
import { FOSTERING_HISTORY, ABOUT_YOUR_HEALTH, START_PAGE } from 'routes'

const HaveYouPreviouslyApplied = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { previouslyApplied, firstName, lastName } = context[currentApplicant]
    const {  secondApplicant, onChangeTarget, onChangeStatus } = context

    const onChange = (event, isValid) => onChangeTarget(event, isValid, currentApplicant)
    const [isLoading, setIsLoading] = useState(false)

    const options = [
        {
            label: 'Yes',
            id: 'have-you-previously-applied-yes',
            name: 'previouslyApplied',
            value: 'true'
        },
        {
            label: 'No',
            id: 'have-you-previously-applied-no',
            name: 'previouslyApplied',
            value: 'false'
        }
    ]

    const handleFormUpdate = async nextPageRoute =>{
        setIsLoading(true)

        try{
            const status = await updateHomeVisitForm(HomeVisitFormName.YourFosteringHistory, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })

            onChangeStatus('yourFosteringHistoryStatus', status)
            history.push(nextPageRoute)
        }   
        catch (error){
            history.push('/error')
        }
    }

    const onSubmit = async event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${FOSTERING_HISTORY}/second-applicant`)
            return
        }

        await handleFormUpdate(ABOUT_YOUR_HEALTH) 
    }

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(START_PAGE)
    }

    const radioValue = `${previouslyApplied.value}`

    return(
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Your fostering history</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    displayHeading
                    header='Have you previously applied to foster, childmind or adopt?'
                    options={options}
                    onChange={onChange}
                    value={radioValue}
                    />
                <SubmitButton
                    currentApplicant={currentApplicant}
                    secondApplicant={secondApplicant}
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    history={history}
                    isLoading={isLoading}
                />
            </form>
        </Fragment>
    )
}

HaveYouPreviouslyApplied.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default HaveYouPreviouslyApplied