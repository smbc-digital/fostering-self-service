import React, { Fragment, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AlertForm, TextInputContainer, AddressPicker, Button, Anchor } from 'smbc-react-components'
import { FIRST_PERSONAL_REFERENCE } from 'routes'
import { Context } from 'context'
import { ApplicationFormName, updateFormStatus, StageName } from '../../../../../helpers'

const FamilyReference = ({ history }) => {
	const { familyReference, secondApplicant, onChangeTarget } = useContext(Context)
	const { firstName, lastName, relationshipToYou, emailAddress, phoneNumber, address } = familyReference
    const [isValid, setIsValid] = useState(false)
    const context = useContext(Context)

	useEffect(() => {
		let valid = firstName.isValid && lastName.isValid && relationshipToYou.isValid && emailAddress.isValid && phoneNumber.isValid && address.isValid
		setIsValid(valid)
    }, [familyReference], [])

    useEffect(() => {
        updateFormStatus({
            form: ApplicationFormName.FamilyReference,
            stage: StageName.Application,
            currentStatus:context.statuses.referencesStatus,
            setStatus: newStatus => context.onChangeStatus('referencesStatus', newStatus)
        })
    }, [])

	const onSubmit = event => {
		event.preventDefault()
		history.push(FIRST_PERSONAL_REFERENCE)
	}

	const onChange = (event, isValid) => onChangeTarget(event, isValid, 'familyReference')

	return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Personal References</h2>
			{secondApplicant && 
			<h3>Tell us the details of the relative who can give you a personal reference for you and your partner</h3> ||
			<h3>Tell us the details of the relative who can give you a personal reference for you</h3>}
			{secondApplicant && 
			<AlertForm
				level='information'
				content='Your referee must be related to you or your partner and be able to comment on your home life and contact with children.'
			/> ||
			<AlertForm
				level='information'
				content='Your referee must be related to you and be able to comment on your home life and contact with children.'
			/> }
			<form onSubmit={onSubmit}>
                <TextInputContainer
                    label='First name'
                    id='firstName'
                    type='text'
                    maxLength={60}
                    value={firstName.value}
                    onChange={onChange}
                />
                <TextInputContainer
                    label='Last name'
                    id='lastName'
                    type='text'
                    maxLength={60}
                    value={lastName.value}
                    onChange={onChange}
                />
                <TextInputContainer
                    label='Relationship to you'
                    id='relationshipToYou'
                    type='text'
                    maxLength={60}
                    value={relationshipToYou.value}
                    customValidationMessage='Enter this person&#39;s relationship to you'
                    onChange={onChange}
                />
				<TextInputContainer
                    label='Email address'
                    id='emailAddress'
                    type='email'
                    maxLength={60}
                    value={emailAddress.value}
                    onChange={onChange}
                />
				<TextInputContainer
                    label='Phone number'
                    id='phoneNumber'
                    type='tel'
                    maxLength={11}
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
				<Button
					label={'Next step'}
					isValid={isValid}
				/> 
				<Anchor
					label='Previous'
					history={history} 
				/> 
			</form>
		</Fragment>
	)
}

FamilyReference.propTypes = {
	history: PropTypes.object
}

export default FamilyReference