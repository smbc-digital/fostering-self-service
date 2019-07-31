import React, { Fragment, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { AlertForm, TextInputContainer, AddressPicker } from 'smbc-react-components'
import {updateForm, updateFormStatus, FormName, getPageRoute } from 'helpers'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'

const YourReference = ({ history }) => {
	const context = useContext(Context)
	const { onChange, onChangeStatus, onChangeReferencePage } = context
	const page = context.referencesPage
	const { firstName, lastName, relationshipToYou, numberOfYearsKnown, emailAddress, phoneNumber, address } = context.familyReference
	const [isLoading, setIsLoading] = useState(false)

	const handleFormUpdate = async nextPageRoute => {
		setIsLoading(true)

		try {
			const status = await updateForm(FormName.References, {
				familyReference: context.familyReference
			})
			onChangeStatus('referencesStatus', status)
			history.push(nextPageRoute)
		} catch (error) {
			history.push('/error')
		}
	}

	const onSubmit = event => {
		event.preventDefault()

		if(page == '1') {
			onChangeReferencePage('2')
			history.push(getPageRoute(24))
			return
		}
		else if(page == '2') {
			onChangeReferencePage('3')
			history.push(`${getPageRoute(24)}/second-reference`)
			return
		}
		onChangeReferencePage('1')
		handleFormUpdate(getPageRoute(1))
	}

	const onSaveAndGoBackClick = event => {
        event.preventDefault()
		event.stopPropagation()
		onChangeReferencePage('1')

        handleFormUpdate(getPageRoute(1))
	}
	
	useEffect(() => {
        updateFormStatus(
            FormName.References,
            context.statuses.referencesStatus,
            newStatus => onChangeStatus('referencesStatus', newStatus)
        )
	}, [])
	
	return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Personal Reference</h2>
			{context.secondApplicant &&
			<h3>Tell us the details of the relative who can give you a personal reference for you and your partner</h3> || <h3>Tell us the details of the relative who can give you a personal reference for you</h3>}
			<AlertForm
                level='information'
                content='We need to check that you’re fit and healthy enough to look after a child. We’ll pay for you to have a medical assessment from your GP and our medical advisor will then talk to your social worker about your fitness to foster.'
            />
			<form onSubmit={onSubmit}>
                <TextInputContainer
                    label='First name'
                    id='firstName'
                    type='text'
                    maxLength='60'
                    value={firstName.value}
                    onChange={onChange}
                />
                <TextInputContainer
                    label='Last name'
                    id='lastName'
                    type='text'
                    maxLength='60'
                    value={lastName.value}
                    onChange={onChange}
                />
                <TextInputContainer
                    label='Relationship to you'
                    id='relationshipToYou'
                    type='text'
                    maxLength='60'
                    value={relationshipToYou.value}
                    onChange={onChange}
                />
				<TextInputContainer
                    label='Relationship to you'
                    id='relationshipToYou'
                    type='text'
                    maxLength='60'
                    value={numberOfYearsKnown.value}
                    onChange={onChange}
                />
				<TextInputContainer
                    label='Email address'
                    id='referenceEmailAddress'
                    type='text'
                    maxLength='11'
                    value={emailAddress.value}
                    onChange={onChange}
                />
				<TextInputContainer
                    label='Phone number'
                    id='referencePhoneNumber'
                    type='text'
                    maxLength='11'
                    value={phoneNumber.value}
                    onChange={onChange}
                />
                <AddressPicker
                    address={address}
                    name='referenceAddress'
                    onChange={onChange}
                    useVerintLookup
                    automaticLabel='Enter the postcode'
                />
				<SubmitButton
                    history={history}
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    isLoading={isLoading}
                />
				</form>
		</Fragment>
	)
}

YourReference.propTypes = {
	history: PropTypes.object
}

export default YourReference