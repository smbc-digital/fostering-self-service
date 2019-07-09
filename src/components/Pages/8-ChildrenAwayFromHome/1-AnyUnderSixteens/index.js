import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer } from 'smbc-react-components'
import { Context } from '../../../context'
import { getCurrentApplicant, getPageRoute, updateForm, FormName } from '../../../helpers'
import { Applicant } from '../../Provider'
import SubmitButton from '../../SubmitButton'

const ChildrenAwayFromHome = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant, secondApplicant, onChangeStatus } = context
    const { firstName, lastName } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.ChildrenAwayFromHome, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })
            onChangeStatus('childrenLivingAwayFromYourHomestatus', status)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }

    const onSubmit = async event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${getPageRoute(17)}/second-applicant`)
            return
        }

        await handleFormUpdate(getPageRoute(18))
    }

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(getPageRoute(1))
    }

    const onChange = (event, isValid) => {
        return onChangeApplicant(event, isValid, currentApplicant)
    }

    const options = [
        {
            label: 'Yes',
			id: 'children-under-sixteen-yes',
            name: 'underSixteen',
            value: 'true'
		},
		{
            label: 'No',
            id: 'children-under-sixteen-no',
            name: 'underSixteen',
            value: 'false'
		}
    ]

    return <Fragment>
        <h1>Your fostering journey</h1>
        <h2>Children living away from your home</h2>
        <h3>{firstName.value} {lastName.value}</h3>
        <form onSubmit={onSubmit}>
            <RadioInputsContainer
                displayHeading
                header='Do you have any children under 16 who live away from your home?'
                options={options}
                onChange={onChange}
                value={`${registeredDisabled.value}`}
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

ChildrenAwayFromHome.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default ChildrenAwayFromHome