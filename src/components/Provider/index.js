import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../../context/'

const Provider = ({ children }) => {
	const [ isLoading, setIsLoading ] = useState(true)

	const onChange = (event, isValid) => {
		setState({
			...state,
			[event.target.name]: {
				value: event.target.value, 
				isValid
			}})
	}

	const fetchCase = async () => {
		const result = await fetch('http://localhost:57726/fostering/case')

		const jsonBody = await result.json()

		console.log(jsonBody)
		setIsLoading(false)
		setState(jsonBody)
	}

	useEffect(() => {
		fetchCase()
	}, [])

	const displayRecaptcha = document.getElementById('displayRecaptcha') ? document.getElementById('displayRecaptcha').innerHTML === 'true' : false

	const [ state, setState ] = useState({
		displayRecaptcha,
		onChange: onChange
	})
	
	return <Context.Provider value={ state }>{ children }</Context.Provider>
}

Provider.propTypes = {
	children: PropTypes.object
}

export default Provider