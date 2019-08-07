import React, { useContext, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import { MemorableDateInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import { updateHomeVisitForm, HomeVisitFormName } from 'helpers'
import SubmitButton from 'components/SubmitButton'
import { FOSTERING_HISTORY, START_PAGE } from 'routes'

const MovedInTogetherDate = ({ history }) => {
    const { onChange, marriedOrInACivilPartnership, dateMovedInTogether, onChangeStatus } = useContext(Context)
    const [isLoading, setIsLoading] = useState()
    const [isValid, setIsValid] = useState(true)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.YourPartnership, {
                marriedOrInACivilPartnership,
                dateMovedInTogether
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

    const onSaveAndGoBackClick = async event => {
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
                    heading='Enter the date you moved in together'
                    description='For example, 7 1980'
                    name='dateMovedInTogether'
                    optional
                    value={moment(dateMovedInTogether.value, ['DD/MM/YYYY','YYYY-M-D']).format('YYYY-M-D')}
                    onChange={(event, isValid) => {
                        setIsValid(isValid)
                        onChange(event, isValid)
                    }}
                    showDay={false}
                    hideOptionalText={true}
                    customValidation={{
                        invalidAfterDate: moment(),
                        customValidationMessage: 'Check the date and try again'
                    }}
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

MovedInTogetherDate.propTypes = {
    history: PropTypes.object
}

export default MovedInTogetherDate