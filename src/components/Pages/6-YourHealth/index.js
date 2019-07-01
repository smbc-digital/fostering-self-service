import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer } from 'smbc-react-components'
import { Context } from '../../../context'
import { getCurrentApplicant, getPageRoute, updateForm, FormName } from '../../../helpers'
import { Applicant } from '../../Provider'
import SubmitButton from '../../SubmitButton'

const YourHealth = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
<<<<<<< refs/remotes/origin/master
    const { onChangeApplicant, secondApplicant, onChangeStatus } = context
=======
    const { onChangeApplicant, secondApplicant,  onChangeStatus } = context
>>>>>>> feature(YourHealth): added your health page and tests
    const { firstName, lastName, registeredDisabled, practitioner } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.YourHealth, {
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
            history.push(`${getPageRoute(6)}/second-applicant`)
            return
        }

        await handleFormUpdate(getPageRoute(6))
    }

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(getPageRoute(1))
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
        <h3>{firstName.value} {lastName.value}</h3> 
        <form onSubmit={onSubmit}>
            <RadioInputsContainer
                displayHeading
                header='Are you registered as disabled?'
                options={optionsDisabled}
                onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
                value={`${registeredDisabled.value}`}
            />
                <RadioInputsContainer
                displayHeading
                header='Do you have any medical conditions?'
                options={optionsHealth}
                onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
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