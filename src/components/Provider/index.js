import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Context } from 'context'

const reduceProperties = object => Object.keys(object).reduce((acc, property) => {
	return {
		...acc,
		[property]: {
			value: object[property] === null || object[property] === undefined ? '' : object[property],
			isValid: object[property] !== null
		}
	}
}, {})

const reduceMandatoryAddressProperties = object =>  {
	return {
		value: object,
		isValid: object.placeRef != '' || (object.addressLine1 != '' && object.town != '' && object.postcode != '') ? true : false
	}
}

const mapCaseToContext = ({ fosteringCase: caseResponse, country, ethnicity, nationality }) => {
	const statuses = {...caseResponse.statuses}

	let secondApplicantDetails = undefined
	delete caseResponse.statuses
	const firstApplicantDetails = reduceProperties(caseResponse.firstApplicant)
	delete caseResponse.firstApplicant

	if (caseResponse.secondApplicant !== null) {
		secondApplicantDetails = reduceProperties(caseResponse.secondApplicant)
	}
	delete caseResponse.secondApplicant

	const familyReferenceDetails = reduceProperties(caseResponse.familyReference)
	delete caseResponse.familyReference
	const familyReferenceAddressDetails = reduceMandatoryAddressProperties(familyReferenceDetails.address.value)
	familyReferenceDetails.address = familyReferenceAddressDetails

	const firstPersonalReferenceDetails = reduceProperties(caseResponse.firstPersonalReference)
	delete caseResponse.firstPersonalReference
	const firstPersonalReferenceAddressDetails = reduceMandatoryAddressProperties(firstPersonalReferenceDetails.address.value)
	firstPersonalReferenceDetails.address = firstPersonalReferenceAddressDetails

	const secondPersonalReferenceDetails = reduceProperties(caseResponse.secondPersonalReference)
	delete caseResponse.secondPersonalReference
	const secondPersonalReferenceAddressDetails = reduceMandatoryAddressProperties(secondPersonalReferenceDetails.address.value)
	secondPersonalReferenceDetails.address = secondPersonalReferenceAddressDetails

	const caseDetails = reduceProperties(caseResponse)

	return {
		statuses, 
		firstApplicant: firstApplicantDetails, 
		secondApplicant: secondApplicantDetails,
		familyReference: familyReferenceDetails,
		firstPersonalReference: firstPersonalReferenceDetails,
		secondPersonalReference: secondPersonalReferenceDetails,
		...caseDetails,
		country: country.map(_ => ({name: _, value: _})),
		ethnicity: ethnicity.map(_ => ({name: _, value: _})),
		nationality: nationality.map(_ => ({name: _, value: _}))
	}
}

const getMappedCase = () => {
	try {
		return mapCaseToContext(window.__FORM_DATA)
	} catch (error) {
		window.location.replace('/fostering/error')
	}
}

const mappedCase = getMappedCase()

const Provider = ({ children }) => {
	const [state, setState] = useState(mappedCase)

	const onChange = (event, isValid) => {
		setState({
			...state,
			[event.target.name]: {
				value: event.target.value, 
				isValid
			}})
	}

	const onChangeStatus = (name, value) => {
		setState({ ...state, statuses: { ...state.statuses, [name]: value }})
	}

	const onChangeTarget = (event, isValid, currentApplicant) => {
		setState({
			...state,
			[currentApplicant]: {
				...state[currentApplicant],
				[event.target.name]: {
					value: event.target.value, 
					isValid
				}
			}
		})
	}

	return <Context.Provider value={{...state, onChange, onChangeTarget, onChangeStatus}}>
		{children}
	</Context.Provider>
}

Provider.propTypes = {
	children: PropTypes.object
}

export default Provider