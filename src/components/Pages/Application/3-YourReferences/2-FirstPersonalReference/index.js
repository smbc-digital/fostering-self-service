import React, { Fragment, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AlertForm, TextInputContainer, AddressPicker, Button, Anchor } from 'smbc-react-components'
import { getPageRoute } from 'helpers'
import { Context } from 'context'

const FirstPersonalReference = ({ history }) => {
	const { firstPersonalReference, secondApplicant, onChangeApplicant } = useContext(Context)
	const { firstName, lastName, relationshipToYou, numberOfYearsKnown, emailAddress, phoneNumber, address } = firstPersonalReference
	const [isValid, setIsValid] = useState(false)

	useEffect(() => {
		let valid = firstName.isValid && lastName.isValid && relationshipToYou.isValid && numberOfYearsKnown.isValid && emailAddress.isValid && phoneNumber.isValid && address.isValid
		setIsValid(valid)
	}, [firstPersonalReference], [])
	
	const onSubmit = event => {
		event.preventDefault()
		history.push(getPageRoute(25))
	}

	const onChange = (event, isValid) => onChangeApplicant(event, isValid, 'firstPersonalReference')

	return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Personal References</h2>
			{secondApplicant && 
			<h3>Tell us the details of the first person who can give you a personal reference for you and your partner</h3> ||
			<h3>Tell us the details of the first person who can give you a personal reference for you</h3>}
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
				<Button
					label={'Next setp'}
					isValid={isValid}
				/> 
				<Anchor
					label='Back'
					history={history} 
				/> 
			</form>
		</Fragment>
	)
}

FirstPersonalReference.propTypes = {
	history: PropTypes.object
}

export default FirstPersonalReference