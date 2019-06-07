import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../../context/'
import { fetchWithTimeout } from '../../helpers'
import { API_ROOT } from '../../config'

const Provider = ({ children }) => {
	const displayRecaptcha = document.getElementById('displayRecaptcha') ? document.getElementById('displayRecaptcha').innerHTML === 'true' : false
	const initialState = {
		displayRecaptcha
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

	const mapCaseToContext = caseResponse => {
		const statuses = {...caseResponse.statuses}
		delete caseResponse.statuses

		const caseDetails = Object.keys(caseResponse).reduce((acc, property) => {
			return {
				...acc,
				[property]: {
					value: caseResponse[property] || '',
					isValid: caseResponse[property] !== null
				}
			}
		}, {})

		setState({...state, ...statuses, ...caseDetails})
	}

	const fetchCase = async () => {
		try {
			const response = await fetchWithTimeout(`${API_ROOT}/fostering/case`)
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

	return <Context.Provider value={{...state, onChange}}>
		{children}
	</Context.Provider>
}

Provider.propTypes = {
	children: PropTypes.object
}

export default Provider