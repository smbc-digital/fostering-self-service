import React, { useContext, Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer } from 'smbc-react-components'
import { Context } from 'context'
import { getCurrentApplicant, updateHomeVisitForm, HomeVisitFormName, updateFormStatus, StageName } from 'helpers'
import { Applicant } from 'components/Provider'
import SubmitButton from 'components/SubmitButton'
import { ABOUT_YOUR_HEALTH, YOUR_INTEREST_IN_FOSTERING, START_PAGE } from 'routes'

const YourHealth = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeTarget, secondApplicant, onChangeStatus } = context
    const { firstName, lastName, registeredDisabled, practitioner } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.YourHealth, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })
            onChangeStatus('yourHealthStatus', status)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }

    const onSubmit = async event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${ABOUT_YOUR_HEALTH}/second-applicant`)
            return
        }

        await handleFormUpdate(YOUR_INTEREST_IN_FOSTERING)
    }

    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.YourHealth,
            stage: StageName.HomeVisit,
            currentStatus:context.statuses.yourHealthStatus,
            setStatus: newStatus => context.onChangeStatus('yourHealthStatus', newStatus)
        })
    }, [])


    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(START_PAGE)
    }

    const onChange = (event, isValid) => {
        return onChangeTarget(event, isValid, currentApplicant) 
    }

    const optionsDisabled = [
        {
            label: 'Yes',
			id: 'register-disabled-yes',
            name: 'registeredDisabled',
            value: 'true'
		},
		{
            label: 'No',
            id: 'register-disabled-no',
            name: 'registeredDisabled',
            value: 'false'
		}
    ]

    const optionsHealth = [
        {
            label: 'Yes',
			id: 'health-problems-yes',
            name: 'practitioner',
            value: 'true'
		},
		{
            label: 'No',
            id: 'health-problems-no',
            name: 'practitioner',
            value: 'false'
		}
    ]

    return <Fragment>
        <h1>Your fostering journey</h1>
        <h2>Your health</h2>
        {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
        <form onSubmit={onSubmit}>
            <RadioInputsContainer
                displayHeading
                header='Are you registered as disabled?'
                options={optionsDisabled}
                onChange={onChange}
                value={`${registeredDisabled.value}`}
            />
                <RadioInputsContainer
                displayHeading
                header='Do you have any medical conditions?'
                options={optionsHealth}
                onChange={onChange}
                value={`${practitioner.value}`}
            />
            <SubmitButton
                currentApplicant={currentApplicant}
                secondApplicant={secondApplicant}
                history={history}
                onSaveAndGoBackClick={onSaveAndGoBackClick}
                isLoading={isLoading}
            />
        </form>
    </Fragment>
}

YourHealth.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default YourHealth