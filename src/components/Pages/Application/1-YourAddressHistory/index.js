import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AddressHistoryDetails, ComponentsList } from 'smbc-react-components'
import { 
    ApplicationFormName, 
    getCurrentApplicant, 
	updateFormStatus,
	updateAddressHistory,
    StageName 
} from 'helpers'
import { START_PAGE } from 'routes'
import { Context } from 'context'
import moment from 'moment'
import SubmitButton from 'components/SubmitButton'

const YourAddressHistory = (match) => {
	const context = useContext(Context)
	const currentApplicant = getCurrentApplicant(match)
	const { onChangeTarget, country, secondApplicant } = context
	const { addressHistory, firstName, lastName } = context[currentApplicant]
	const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        updateFormStatus({
            form: ApplicationFormName.AddressHistory,
            stage: StageName.Application,
            currentStatus: context.statuses.addressHistoryStatus,
            setStatus: newStatus => context.onChangeStatus('addressHistoryStatus', newStatus)
        })
    }, [])

	const onAddressChange = (values, isValid) => {
        onChangeTarget({
            target: {
                name: 'addressHistory',
                value: values
            }
        }, isValid, currentApplicant)
	}

	const isButtonValid = () => {
		let dateInLastTenYears = addressHistory.value.some(address => {
			return address.dateFrom === undefined ? false : moment(address.dateFrom.value, ['DD/MM/YYYY', 'YYYY-M-D']).isBefore(moment().subtract(10, 'years'))
		})

		var allFieldsValid = addressHistory.value.length > 1 
			? 
			addressHistory.value.every((addressData) => {
				return addressData.dateFrom.isValid && addressData.address.addressLine1.isValid && addressData.address.town.isValid && addressData.address.country.isValid
				})
			: true

		console.log(allFieldsValid)
		console.log(dateInLastTenYears)
		return allFieldsValid && dateInLastTenYears
	}

	const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateAddressHistory(ApplicationFormName.AddressHistory, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })
            onChangeStatus('addressHistoryStatus', status)
            setIsLoading(false)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
	}
	
	const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(START_PAGE)
	}

	const renderComponent = (onChange, firstInputRef, values, index) => {
		const onComponentChange = (data) => {
            onChange(data, true, index)
		}
		
		const date = {
			value: values.dateFrom === undefined ? '' : moment(values.dateFrom.value, ['DD/MM/YYYY', 'YYYY-M-D']).format('YYYY-M-D'),
			isValid: values.dateFrom === undefined ? false : values.dateFrom.isValid
		}
		return (
			<AddressHistoryDetails
				options={country}
				dateFrom={date}
				address={values.address}
				addressHeader='Tell us your previous address'
				dateHeader={index == 0 ? 'Tell us when you moved into your current address' : 'Tell us when you moved into this address'}
				onChange={onComponentChange}
				hideAddress={index == 0}
			/>
		)
	} 

	return (
		<form>
			<h1>Your fostering journey</h1>
            <h2>Your address history</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
			<ComponentsList 
				onChange={onAddressChange}
				componentName='addressHistoryDetails'
				addItemMessage='Add another address'
				removeItemMessage='Remove this address'
				showAddMoreButton={true}
				renderComponent={renderComponent}
				values={addressHistory.value}
				showRemoveonAllExceptFirstComponent={true}
				showRemoveOnAllComponents={false}
			/>
			<SubmitButton
				currentApplicant={currentApplicant}
				secondApplicant={secondApplicant}
				history={history}
				onSaveAndGoBackClick={onSaveAndGoBackClick}
				isLoading={isLoading}
				isValid={isButtonValid()}
			/>
		</form>
	)
}

YourAddressHistory.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default YourAddressHistory