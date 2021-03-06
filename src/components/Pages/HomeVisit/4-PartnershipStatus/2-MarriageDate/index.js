import React, { useContext, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { MemorableDateInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'
import { updateHomeVisitForm, HomeVisitFormName } from 'helpers'
import { FOSTERING_HISTORY, START_PAGE } from 'routes'

const MarriageDate = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { onChange, onChangeStatus, dateOfMarriage, marriedOrInACivilPartnership } = useContext(Context)
    const [isValid, setIsValid] = useState(true)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)
		HomeVisitFormName
		try {
			const status = await updateHomeVisitForm(HomeVisitFormName.YourPartnership, {
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

        handleFormUpdate(FOSTERING_HISTORY)
    }

    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()

        handleFormUpdate(START_PAGE)
    }

    return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Your partnership status</h2>
			<form onSubmit={onSubmit}>
				<MemorableDateInputContainer
					heading="Date of your marriage or civil partnership"
					description="For example, 31 3 1980"
					name="dateOfMarriage"
					optional
					value={moment(dateOfMarriage.value, ['DD/MM/YYYY', 'YYYY-M-D']).format('YYYY-M-D')}
					onChange={(event, isValid) => {
						setIsValid(isValid)
						onChange(event, isValid)
					}}
					hideOptionalText={true}
					customValidation={{
                        invalidAfterDate: moment(),
                        customValidationMessage: 'Check the date and try again'
                    }}
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