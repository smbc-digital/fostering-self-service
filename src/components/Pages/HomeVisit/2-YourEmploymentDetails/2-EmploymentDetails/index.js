import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, RadioInputsContainer } from 'smbc-react-components'
import { Context } from 'context'
import { getCurrentApplicant, getPageRoute, updateHomeVisitForm, HomeVisitFormName } from 'helpers'
import { Applicant } from 'components/Provider'
import SubmitButton from 'components/SubmitButton'


const EmploymentDetails = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeTarget, secondApplicant,  onChangeStatus } = context
    const { firstName, lastName, currentEmployer, jobTitle, currentHoursOfWork } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.YourEmploymentDetails, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })
            onChangeStatus('yourEmploymentDetailsStatus', status)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }

    const onSubmit = async event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${getPageRoute(4)}/second-applicant`)
            return
        }

        await handleFormUpdate(getPageRoute(6))
    }

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(getPageRoute(1))
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

    const onChange = (event, isValid) => {
        return onChangeTarget(event, isValid, currentApplicant)
    }

    return <form onSubmit={onSubmit}>
                <h1>Your fostering journey</h1>
                <h2>Your employment details</h2>
                {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
                <TextInputContainer
                    label='Current employer'
                    id='currentEmployer'
                    type='text'
                    maxLength='60'
                    optional={true}
                    hideOptional
                    value={currentEmployer.value}
                    onChange={onChange}
                />
                <TextInputContainer
                    label='Job title'
                    id='jobTitle'
                    type='text'
                    maxLength='60'
                    optional={true}
                    hideOptional
                    value={jobTitle.value}
                    onChange={onChange}
                />
                <RadioInputsContainer
                    displayHeading
                    header='Current hours of work'
                    options={options}
                    onChange={onChange}
                    value={`${currentHoursOfWork.value}`}
                />
                <SubmitButton
                    currentApplicant={currentApplicant}
                    secondApplicant={secondApplicant}
                    history={history}
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    isLoading={isLoading}
                />
            </form>
}

EmploymentDetails.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default EmploymentDetails