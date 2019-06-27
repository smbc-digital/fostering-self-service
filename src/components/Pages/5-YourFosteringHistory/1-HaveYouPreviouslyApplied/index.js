import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {RadioInputsContainer} from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute, updateForm, FormName } from '../../../../helpers'
import { Applicant } from '../../../Provider'
import SubmitButton from '../../../SubmitButton'

const HaveYouPreviouslyApplied = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { previouslyApplied, firstName, lastName } = context[currentApplicant]
    const {  secondApplicant, onChangeApplicant, onChangeStatus } = context

    const onChange = (event, isValid) => onChangeApplicant(event, isValid, currentApplicant)
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
            const status = await updateForm(FormName.YourFosteringHistory, {
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
            history.push(`${getPageRoute(10)}/second-applicant`)
            return
        }

        await handleFormUpdate(getPageRoute(1)) 
    }

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(getPageRoute(1))
    }

    const radioValue = `${previouslyApplied.value}`

    return(
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Your fostering history</h2>
            <h3>{firstName.value} {lastName.value}</h3>
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