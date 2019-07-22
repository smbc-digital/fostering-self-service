import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../../context/'
import { fetchWithTimeout } from '../../helpers'
import { API_ROOT, FosteringErrorRoute } from '../../config'

export const Applicant = {
	FirstApplicant: 'firstApplicant',
	SecondApplicant: 'secondApplicant',
}

const reduceProperties = object => Object.keys(object).reduce((acc, property) => {
	return {
		...acc,
		[property]: {
			value: object[property] === null || object[property] === undefined ? '' : object[property],
			isValid: object[property] !== null
		}
	}
}, {})

const Provider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [state, setState] = useState({})

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

	const onChangeApplicant = (event, isValid, currentApplicant) => {
		// let eventValue = event.target.value === 'true' ? true 
		// 												: event.target.value === 'false' ? false 
		// 												: event.target.value

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

		const caseDetails = reduceProperties(caseResponse)

		setState({
			...state, 
			statuses, 
			firstApplicant: firstApplicantDetails, 
			secondApplicant: secondApplicantDetails,
			...caseDetails,
			country: country.map(_ => ({name: _, value: _})),
			ethnicity: ethnicity.map(_ => ({name: _, value: _})),
			nationality: nationality.map(_ => ({name: _, value: _})),
		})
	}

	const fetchCase = async () => {
		try {
			const response = await fetchWithTimeout(`${API_ROOT}/fostering/case`, { credentials: 'include' })
			const body = await response.json()
			mapCaseToContext(body)
		} catch (error) {
			window.location.replace(FosteringErrorRoute)
		}
	}

	useEffect(() => {
		fetchCase()
	}, [])

	useEffect(() => {
		// Set isLoading to false only after the case is in state 
		if (isLoading && Object.keys(state).length > 0) {
			setIsLoading(false)
		}
	}, [state])

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <Context.Provider value={{...state, onChange, onChangeApplicant, onChangeStatus}}>
		{children}
	</Context.Provider>
}

Provider.propTypes = {
	children: PropTypes.object
}

export default Provider