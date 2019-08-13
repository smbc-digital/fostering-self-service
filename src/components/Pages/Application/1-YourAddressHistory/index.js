import React, { Fragment, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AddressHistoryDetails, ComponentsList } from 'smbc-react-components'
import { 
    ApplicationFormName, 
    getCurrentApplicant, 
    updateFormStatus,
    StageName 
} from 'helpers'
import { Context } from 'context'
import SubmitButton from 'components/SubmitButton'

const YourAddressHistory = (match) => {
	const context = useContext(Context)
	const currentApplicant = getCurrentApplicant(match)
	const { onChange, country, secondApplicant } = context
	const { addressHistory } = context[currentApplicant]
	const [isLoading] = useState(false)

    useEffect(() => {
        updateFormStatus({
            form: ApplicationFormName.AddressHistory,
            stage: StageName.Application,
            currentStatus: context.statuses.addressHistoryStatus,
            setStatus: newStatus => context.onChangeStatus('addressHistoryStatus', newStatus)
        })
    }, [])

	const onAddressChange = (values, isValid) => {
        onChange({
            target: {
                name: 'addressHistory',
                value: values
            }
        }, isValid)
	}
	
	const onSaveAndGoBackClick = () => {

	}

	const renderComponent = (onChange, firstRef, values, index) => {
		const onComponentChange = ({ target: { name, value }}, isValid) => {
			let newValues = { ...values, [name]: value }
			
            onChange(newValues, isValid, index)
		}
		
		console.log(values)
		return (
			<AddressHistoryDetails 
				options={country}
				dateFrom={values[index].dateFrom}
				address={values[index].address}
				addressHeader='Tell us your previous address'
				dateHeader='Tell us when you moved into this address'
				onChange={onComponentChange}
			/>
		)
	} 

	return (
		<Fragment>
		<ComponentsList 
			onChange={onAddressChange}
			componentName='addressHistoryDetails'
			addItemMessage='Add another address'
			removeItemMessage='Remove this address'
			showAddMoreButton={true}
			renderComponent={renderComponent}
			values={addressHistory[0]}
		/>
		{/* <SubmitButton
			currentApplicant={currentApplicant}
			secondApplicant={secondApplicant}
			history={history}
			onSaveAndGoBackClick={onSaveAndGoBackClick}
			isLoading={isLoading}
			isValid={true}
		/> */}
		</Fragment>
	)
}

export default YourAddressHistory