import React, { Fragment, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { AlertForm, TextInputContainer, AddressPicker } from 'smbc-react-components'
import { updateForm, updateFormStatus, FormName, getCurrentApplicant, getPageRoute } from 'helpers'
import { Applicant } from 'components/Provider'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'

const YourGpDetails = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeStatus, onChangeApplicant, firstApplicant, secondApplicant } = context
    const { firstName, lastName, nameOfGp, nameOfGpPractice, gpPhoneNumber, gpAddress } = context[currentApplicant] 
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (event, isValid) => onChangeApplicant(event, isValid, currentApplicant)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.GpDetails, {
                firstApplicant,
                secondApplicant
            })
            onChangeStatus('gpDetailsStatus', status)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }

    const onSubmit = event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${getPageRoute(22)}/second-applicant`)
            return
        }

        handleFormUpdate(getPageRoute(1))
    }

    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()

        handleFormUpdate(getPageRoute(1))
    }

    useEffect(() => {
        updateFormStatus(
            FormName.GpDetails,
            context.statuses.gpDetailsStatus,
            newStatus => onChangeStatus('gpDetailsStatus', newStatus)
        )
    }, [])

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Tell us about your GP </h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <AlertForm
                level='information'
                content='We need to check that you’re fit and healthy enough to look after a child. We’ll pay for you to have a medical assessment from your GP and our medical advisor will then talk to your social worker about your fitness to foster.'
            />
            <form onSubmit={onSubmit}>
                <TextInputContainer
                    label='Name of GP'
                    id='nameOfGp'
                    type='text'
                    maxLength='60'
                    value={nameOfGp.value}
                    onChange={onChange}
                    isValid={false}
                />
                <TextInputContainer
                    label='Name of GP practice'
                    id='nameOfGpPractice'
                    type='text'
                    maxLength='60'
                    value={nameOfGpPractice.value}
                    onChange={onChange}
                />
                <TextInputContainer
                    label='Phone number'
                    id='gpPhoneNumber'
                    type='tel'
                    maxLength='11'
                    value={gpPhoneNumber.value}
                    onChange={onChange}
                />
                <AddressPicker
                    address={gpAddress.value}
                    name='gpAddress'
                    onChange={onChange}
                    useVerintLookup
                    automaticLabel='Enter the postcode'
                    key={currentApplicant}
                />
                <SubmitButton
                    currentApplicant={currentApplicant}
                    secondApplicant={secondApplicant}
                    history={history}
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    isLoading={isLoading}
                    isValid={nameOfGp.isValid && nameOfGpPractice.isValid && gpPhoneNumber.isValid && gpAddress.isValid}
                />
            </form>
        </Fragment>
    )
}

YourGpDetails.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default YourGpDetails