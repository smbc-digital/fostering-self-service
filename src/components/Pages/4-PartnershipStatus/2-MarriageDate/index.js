import React, { useContext, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { MemorableDateInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'
import { getPageRoute, updateForm, FormName } from 'helpers'

const MarriageDate = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { onChange, onChangeStatus, dateOfMarriage, marriedOrInACivilPartnership } = useContext(Context)
    const [isValid, setIsValid] = useState(true)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)
        
		try {
			const status = await updateForm(FormName.YourPartnership, {
				dateOfMarriage,
				marriedOrInACivilPartnership
			})

			onChangeStatus('yourPartnershipStatus', status)

			history.push(nextPageRoute)
		} catch (error) {
			history.push('/error')
		}
	}

    const onSubmit = event => {
        event.preventDefault()

        handleFormUpdate(getPageRoute(10))
    }

    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()

        handleFormUpdate(getPageRoute(1))
    }

    return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Your partnership status</h2>
			<form onSubmit={onSubmit}>
				<MemorableDateInputContainer
					heading="Date of your marriage or civil partnerhsip"
					description="For example, 31 3 1980"
					name="dateOfMarriage"
					optional
					value={moment(dateOfMarriage.value, ['DD/MM/YYYY', 'YYYY-M-D']).format('YYYY-M-D')}
					onChange={(event, isValid) => {
						setIsValid(isValid)
						onChange(event, isValid)
					}}
					hideOptionalText={true}
				/>
				<SubmitButton
					history={history}
					onSaveAndGoBackClick={onSaveAndGoBackClick}
					isLoading={isLoading}
					isValid={isValid}
				/>
			</form>
		</Fragment>
	)
}

MarriageDate.propTypes = {
    history: PropTypes.object
}


export default MarriageDate