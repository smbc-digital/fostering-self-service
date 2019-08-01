import React, { Fragment, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AlertForm, TextInputContainer, AddressPicker } from 'smbc-react-components'
import { updateFormStatus, FormName, updateForm, getPageRoute } from 'helpers'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'

const SecondPersonalReference = ({ history }) => {
	const context = useContext(Context)
	const { onChangeStatus, familyReference, firstPersonalReference, secondPersonalReference, secondApplicant, onChangeApplicant } = context
	const { firstName, lastName, relationshipToYou, numberOfYearsKnown, emailAddress, phoneNumber, address } = secondPersonalReference
	const [isValid, setIsValid] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		let valid = firstName.isValid && lastName.isValid && relationshipToYou.isValid && numberOfYearsKnown.isValid && emailAddress.isValid && phoneNumber.isValid && address.isValid
		setIsValid(valid)
	}, [secondPersonalReference], [])

	useEffect(() => {
        updateFormStatus(
            FormName.References,
            context.statuses.referencesStatus,
            newStatus => onChangeStatus('referencesStatus', newStatus)
        )
	}, [])
	
	const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.References, {
                familyReference,
				firstPersonalReference,
				secondPersonalReference
            })
            onChangeStatus('referencesStatus', status)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }
	
	const onSubmit = event => {
		event.preventDefault()
		handleFormUpdate(getPageRoute(1))
	}

	const onSaveAndGoBackClick = event => {
        event.preventDefault()
		event.stopPropagation()

		handleFormUpdate(getPageRoute(1))
	}

	const onChange = (event, isValid) => onChangeApplicant(event, isValid, 'secondPersonalReference')

	return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Personal References</h2>
			{secondApplicant && 
			<h3>Tell us the details of the second person who can give you a personal reference for you and your partner</h3> ||
			<h3>Tell us the details of the second person who can give you a personal reference for you</h3>}
			{secondApplicant && 
			<AlertForm
				level='information'
				content='Your referee must have known you for at least 2 years and be able to comment on your home life and contact with children. They must not be related to you or your partner.'
			/> ||
			<AlertForm
				level='information'
				content='Your referee must have known you for at least 2 years and be able to comment on your home life and contact with children. They must not be related to you.'
			/> }
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
					label='How long have you known this person?'
					id='numberOfYearsKnown'
					type='text'
					maxLength='60'
					value={numberOfYearsKnown.value}
					onChange={onChange}
				/>
				<TextInputContainer
                    label='Email address'
                    id='emailAddress'
                    type='email'
                    maxLength='60'
                    value={emailAddress.value}
                    onChange={onChange}
                />
				<TextInputContainer
                    label='Phone number'
                    id='phoneNumber'
                    type='tel'
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
				<SubmitButton
					history={history}
					isValid={isValid}
					onSaveAndGoBackClick={onSaveAndGoBackClick}
					isLoading={isLoading}
				/> 
			</form>
		</Fragment>
	)
}

SecondPersonalReference.propTypes = {
	history: PropTypes.object
}

export default SecondPersonalReference