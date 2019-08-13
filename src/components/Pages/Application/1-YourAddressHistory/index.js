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
	const { onChange, onChangeTarget, country, secondApplicant } = context
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
        onChangeTarget({
            target: {
                name: 'addressHistory',
                value: values
            }
        }, isValid, currentApplicant)
	}
	
	const onSaveAndGoBackClick = () => {

	}

	const renderComponent = (onChange, firstInputRef, values, index) => {
		const onComponentChange = (data) => {
			let newValues = { ...values, [index]: data }
			
            onChange({
				target: {
					name: 'addressHistory',
					value: newValues
				}
			}, true)
		}
		
		return (
			<AddressHistoryDetails
				options={country}
				dateFrom={values.dateFrom}
				address={values.address}
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
			values={addressHistory}
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