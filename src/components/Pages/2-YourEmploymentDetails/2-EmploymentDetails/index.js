import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, RadioInputsContainer } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute, updateForm, FormName } from '../../../../helpers'
import { Applicant } from '../../../Provider'
import SubmitButton from '../../../SubmitButton'

const EmploymentDetails = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant, secondApplicant } = context
    const { firstName, lastName, currentEmployer, jobTitle, currentHoursOfWork } = context[currentApplicant]

    const onSubmit = backToStart => {
        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${getPageRoute(4)}/second-applicant`)
            return
        }

        updateForm(FormName.YourEmploymentDetails, {
            firstApplicant: context.firstApplicant,
            secondApplicant: context.secondApplicant
        })

        if(backToStart){
            history.push(getPageRoute(1))
            return
        }

        history.push(getPageRoute(1))
    }

    const options = [
        {
            label: 'Full time',
			id: 'current-hours-of-work-full-time',
            name: 'currentHoursOfWork',
            value: '2'
		},
		{
            label: 'Part time',
            id: 'current-hours-of-work-part-time',
            name: 'currentHoursOfWork',
            value: '1'
		}
    ]
    
    return <form onSubmit={event => event.preventDefault()}>
                <h1>Your fostering journey</h1>
                <h2>Your employment details</h2>
                <p>{firstName.value} {lastName.value}</p>
                <TextInputContainer
                    label='Current employer'
                    id='currentEmployer'
                    type='text'
                    maxLength='60'
                    optional={true}
                    hideOptional
                    value={currentEmployer.value}
                    onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
                />
                <TextInputContainer
                    label='Job title'
                    id='jobTitle'
                    type='text'
                    maxLength='60'
                    optional={true}
                    hideOptional
                    value={jobTitle.value}
                    onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
                />
                <RadioInputsContainer 
                    displayHeading
                    header='Current hours of work' 
                    options={options} 
                    onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)} 
                    value={`${currentHoursOfWork.value}`}
                />
                <SubmitButton 
                    currentApplicant={currentApplicant} 
                    secondApplicant={secondApplicant} 
                    onSubmit={backToStart => onSubmit(backToStart)}
                    history={history}
                />
            </form>
}

EmploymentDetails.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default EmploymentDetails