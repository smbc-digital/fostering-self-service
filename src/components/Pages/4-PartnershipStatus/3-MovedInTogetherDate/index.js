import React, { useContext, useState, Fragment } from 'react'
import moment from 'moment'
import { MemorableDateInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import { getPageRoute, updateForm, FormName } from 'helpers'
import SubmitButton from 'components/SubmitButton'

const MovedInTogetherDate = ({ history }) => {
    const { onChange, marriedOrInACivilPartnership, dateMovedInTogether, onChangeStatus } = useContext(Context)
    const [isLoading, setIsLoading] = useState()
    const [isValid, setIsValid] = useState(true)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.YourPartnership, {
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

        handleFormUpdate(getPageRoute(10))
    }

    const onSaveAndGoBackClick = async event => {
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

export default MovedInTogetherDate