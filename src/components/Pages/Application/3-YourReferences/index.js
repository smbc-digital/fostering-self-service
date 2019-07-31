import React, { Fragment, useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { AlertForm, TextInputContainer, AddressPicker, Button, Anchor } from 'smbc-react-components'
import {updateForm, updateFormStatus, FormName, getPageRoute } from 'helpers'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton' 

const YourReference = ({ history }) => {
	const context = useContext(Context)
	const page = context.referencesPage
	const { onChangeStatus, onChangeApplicant, onChangeReferencePage, familyReference, firstPersonalReference, secondPersonalReference } = context
	const { firstName, lastName, relationshipToYou, numberOfYearsKnown, emailAddress, phoneNumber, address } = context[page]
	const [isLoading, setIsLoading] = useState(false)
	const [isValid, setIsValid] = useState(false)

	const onChange = (event, isValid) => onChangeApplicant(event, isValid, page)

	useEffect(() => {
		let validReference = page == 'familyReference' ? firstName.isValid && lastName.isValid && relationshipToYou.isValid && emailAddress.isValid && phoneNumber.isValid : firstName.isValid && lastName.isValid && relationshipToYou.isValid && numberOfYearsKnown.isValid && emailAddress.isValid && phoneNumber.isValid
		setIsValid(validReference)
		updateFormStatus(
            FormName.References,
            context.statuses.referencesStatus,
            newStatus => onChangeStatus('referencesStatus', newStatus)
        )
	}, [context[page], []])

	const handleFormUpdate = async nextPageRoute => {
		setIsLoading(true)

		try {
			const status = await updateForm(FormName.References, {
				familyReference,
				firstPersonalReference,
				secondPersonalReference
			})
			onChangeStatus('referencesStatus', status)
			onChangeReferencePage('familyReference')
			history.push(nextPageRoute)
		} catch (error) {
			history.push('/error')
		}
	}

	const onSubmit = event => {
		event.preventDefault()

		if(page == 'familyReference') {
			onChangeReferencePage('firstPersonalReference')
			history.push(getPageRoute(24))
			return
		}
		else if(page == 'firstPersonalReference') {
			onChangeReferencePage('secondPersonalReference')
			history.push(`${getPageRoute(24)}/second-reference`)
			return
		}
		onChangeReferencePage('familyReference')
		handleFormUpdate(getPageRoute(1))
	}

	const onSaveAndGoBackClick = event => {
        event.preventDefault()
		event.stopPropagation()

		handleFormUpdate(getPageRoute(1))
	}
	
	return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Personal Reference</h2>
			{context.secondApplicant &&
			<h3>Tell us the details of the relative who can give you a personal reference for you and your partner</h3> || <h3>Tell us the details of the relative who can give you a personal reference for you</h3>}
			{context.secondApplicant &&
				<AlertForm
					level='information'
					content='Your referee must be related to you or your partner and be able to comment on your home life and contact with children.'
				/> || 
				<AlertForm
					level='information'
					content='Your referee must be related to you and be able to comment on your home life and contact with children.'
				/>
			}
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
				{page != 'familyReference' && 
					<TextInputContainer
						label='How long have you known this person?'
						id='numberOfYearsKnown'
						type='text'
						maxLength='60'
						value={numberOfYearsKnown.value}
						onChange={onChange}
					/>
				}
				<TextInputContainer
                    label='Email address'
                    id='emailAddress'
                    type='text'
                    maxLength='11'
                    value={emailAddress.value}
                    onChange={onChange}
                />
				<TextInputContainer
                    label='Phone number'
                    id='phoneNumber'
                    type='text'
                    maxLength='11'
                    value={phoneNumber.value}
                    onChange={onChange}
                />
                <AddressPicker
                    address={address.value}
                    name='address'
                    onChange={onChange}
                    useVerintLookup
                    automaticLabel='Enter the postcode'
                />
				{page != 'secondPersonalReference' && 
					<Fragment>
						<Button
							label={'Next setp'}
							isValid={isValid}
						/> 
						<Anchor
						label='Back'
						history={history} 
						/> 
					</Fragment>
				}
				{page == 'secondPersonalReference' && 
					<SubmitButton
						history={history}
						isValid={isValid}
						onSaveAndGoBackClick={onSaveAndGoBackClick}
						isLoading={isLoading}
					/> 
				}
			</form>
		</Fragment>
	)
}

YourReference.propTypes = {
	history: PropTypes.object
}

export default YourReference