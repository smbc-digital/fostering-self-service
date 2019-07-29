import React, { Fragment, useEffect, useContext } from 'react'
import { AlertForm, TextInputContainer, AddressPicker } from 'smbc-react-components'
import { updateFormStatus, FormName, getCurrentApplicant, getPageRoute } from 'helpers'
import { Applicant } from 'components/Provider'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'

const YourGpDetails = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeStatus, onChangeApplicant, secondApplicant } = context
    const { nameOfGp, nameOfGpPractice, gpPhoneNumber, gpAddress } = context[currentApplicant] 

    const onChange = (event, isValid) => onChangeApplicant(event, isValid, currentApplicant)

    const onSubmit = event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${getPageRoute(21)}/second-applicant`)
            return
        }
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
                    type='text'
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
                />

                <SubmitButton
                    currentApplicant={currentApplicant}
                    secondApplicant={secondApplicant}
                    history={history}
                    // onSaveAndGoBackClick={onSaveAndGoBackClick}
                    // isLoading={isLoading}
                />
            </form>
        </Fragment>
    )
}

export default YourGpDetails