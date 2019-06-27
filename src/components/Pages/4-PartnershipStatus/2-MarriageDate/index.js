import React, { useContext, useState, Fragment } from 'react'
import moment from 'moment'
import { MemorableDateInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'
import { getPageRoute, updateForm, FormName } from 'helpers'

const MarriageDate = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { onChange, onChangeStatus, dateOfMarriage, marriedOrInACivilPartnership } = useContext(Context)

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

        handleFormUpdate(getPageRoute(11))
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
                    heading='Date of your marriage or civil partnerhsip'
                    description='For example, 31 3 1980'
                    name='dateOfMarriage'
                    optional
                    value={moment(dateOfMarriage.value, ['DD/MM/YYYY','YYYY-M-D']).format('YYYY-M-D')}
                    onChange={onChange}
                    hideOptionalText={true}
                />
                <SubmitButton
                    history={history}
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    isLoading={isLoading}
                />
            </form>
		</Fragment>
	)
}

export default MarriageDate