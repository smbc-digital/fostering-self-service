import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../../context/'
import { fetchWithTimeout } from '../../helpers'
import { API_ROOT } from '../../config'

export const Applicant = {
	FirstApplicant: 'firstApplicant',
	secondApplicant: 'secondApplicant'
}

const reduceProperties = object => Object.keys(object).reduce((acc, property) => {
	return {
		...acc,
		[property]: {
			value: object[property] || '',
			isValid: object[property] !== null
		}
	}
}, {})

const Provider = ({ children }) => {
	const displayRecaptcha = document.getElementById('displayRecaptcha') ? document.getElementById('displayRecaptcha').innerHTML === 'true' : false
	const initialState = {
		displayRecaptcha,
		currentApplicant: Applicant.FirstApplicant,
	}

	const [isLoading, setIsLoading] = useState(true)
	const [state, setState] = useState(initialState)
	const [error, setError] = useState(undefined)

	const onChange = (event, isValid) => {
		setState({
			...state,
			[event.target.name]: {
				value: event.target.value, 
				isValid
			}})
	}

	const onChangeApplicant = (event, isValid) => {
		setState({
			...state,
			[state.currentApplicant]: {
				...state[state.currentApplicant],
				[event.target.name]: {
					value: event.target.value, 
					isValid
				}
			}
		})
	}

	const setApplicant = applicant => {
		setState({
			...state,
			currentApplicant: applicant
		})
	}

	const mapCaseToContext = caseResponse => {
		const statuses = {...caseResponse.statuses}
		let secondApplicantDetails = undefined
		delete caseResponse.statuses

		const firstApplicantDetails = reduceProperties(caseResponse.firstApplicant)
		delete caseResponse.firstApplicant

		if (caseResponse.secondApplicant !== null) {
			secondApplicantDetails = reduceProperties(caseResponse.secondApplicant)
		}
		delete caseResponse.secondApplicant

		const caseDetails = reduceProperties(caseResponse)

		setState({
			...state, 
			...statuses, 
			firstApplicant: firstApplicantDetails, 
			secondApplicant: secondApplicantDetails, 
			...caseDetails
		})
	}

	const fetchCase = async () => {
		try {
			const response = await fetchWithTimeout(`${API_ROOT}/fostering/case`, { credentials: 'include' })
			const body = await response.json()
			mapCaseToContext(body)
		} catch (error) {
			setError(error)
		}
	}

	useEffect(() => {
		fetchCase()
	}, [])

	useEffect(() => {
		// Set isLoading to false only after the case is in state 
		if (isLoading && Object.keys(state).length > Object.keys(initialState).length) {
			setIsLoading(false)
		}
	}, [state])

	if (error) {
		return <p>Error</p>
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <Context.Provider value={{...state, onChange, onChangeApplicant, setApplicant}}>
		{children}
	</Context.Provider>
}

Provider.propTypes = {
	children: PropTypes.object
}

export default Provider