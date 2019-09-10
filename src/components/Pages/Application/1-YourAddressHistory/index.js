import React, { useContext, useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ComponentsList, TextInputContainer, SelectInputContainer, MemorableDateInputContainer, AlertForm } from 'smbc-react-components'
import { 
    ApplicationFormName, 
    getCurrentApplicant, 
	updateFormStatus,
	StageName,
	updateApplicationForm 
} from 'helpers'
import { Context } from 'context'
import { START_PAGE, ABOUT_YOUR_GP, ADDRESS_HISTORY } from 'routes'
import { Applicant } from 'constants'
import moment from 'moment'
import SubmitButton from 'components/SubmitButton'

const YourAddressHistory = ({history, match}) => {
	const context = useContext(Context)
	const currentApplicant = getCurrentApplicant(match)
	const { onChangeTarget, onChangeStatus, country, secondApplicant } = context
	const { addressHistory, firstName, lastName } = context[currentApplicant]
	const [isLoading, setIsLoading] = useState(false)
	const showAddMoreOnFirstComponent = addressHistory.value[0].dateFrom === undefined ? false : moment(addressHistory.value[0].dateFrom.value, ['DD/MM/YYYY', 'YYYY-M-D']).isAfter(moment().subtract(10, 'years'))

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

	const isFormValid = () => {
		let dateOverLastTenYears = addressHistory.value.some(address => {
			return address.dateFrom === undefined ? false : moment(address.dateFrom.value, ['DD/MM/YYYY', 'YYYY-M-D']).isBefore(moment().subtract(10, 'years'))
		})

		var allFieldsValid = addressHistory.value.length > 1 
		? 
		addressHistory.value.every((addressData, index) => {
			if(index == 0){
				return addressData.dateFrom.isValid
			} else {
				if(addressData.dateFrom === undefined || addressData.address === undefined || addressData.address.addressLine1 === undefined || addressData.address.town === undefined || addressData.address.country === undefined){
					return false
				} else {
					return addressData.dateFrom.isValid && addressData.address.addressLine1.isValid && addressData.address.town.isValid && addressData.address.country.isValid
				}
			}
			})
		: true

		return dateOverLastTenYears && allFieldsValid
	}

	const displayAddAnotherOnFirstAddress = () => {
		if(addressHistory.value.length > 1 ){
			let dateOverLastTenYears = addressHistory.value.some(address => {
				return address.dateFrom === undefined ? false : moment(address.dateFrom.value, ['DD/MM/YYYY', 'YYYY-M-D']).isBefore(moment().subtract(10, 'years'))
			})

			var allFieldsValid = addressHistory.value.length > 1 
			? 
			addressHistory.value.every((addressData, index) => {
				if(index == 0){
					return addressData.dateFrom.isValid
				} else {
					if(addressData.dateFrom === undefined || addressData.address === undefined || addressData.address.addressLine1 === undefined || addressData.address.town === undefined || addressData.address.country === undefined){
						return false
					} else {
						return addressData.dateFrom.isValid && addressData.address.addressLine1.isValid && addressData.address.town.isValid && addressData.address.country.isValid
					}
				}
				})
			: true

			return dateOverLastTenYears && allFieldsValid
		} else {
			const showAddMoreOnFirstComponent = addressHistory.value[0].dateFrom === undefined ? false : moment(addressHistory.value[0].dateFrom.value, ['DD/MM/YYYY', 'YYYY-M-D']).isAfter(moment().subtract(10, 'years'))
			
			return !showAddMoreOnFirstComponent
		}
	}
	
	const handleFormUpdate = async nextPageRoute => {
		setIsLoading(true)
        try {
            const status = await updateApplicationForm(ApplicationFormName.AddressHistory, {
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

	const onSubmit = (event) => {
		event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
			handleFormUpdate(`${ADDRESS_HISTORY}/second-applicant`)
			return
        }

        handleFormUpdate(ABOUT_YOUR_GP)
	}

	const renderComponent = (onChange, firstInputRef, values, index) => {
		const onComponentChange = ({ target: { name, value }}, isValid) => {
			let newValues = {}

			if(name === 'dateFrom'){
				newValues = {
					...values,
						['dateFrom']: {
							value: value, 
							isValid
					}
				} 
			} else {
				newValues = {
					...values,
						['address']: {
							...values['address'],
							[name]: {
								value: value, 
								isValid
						}
					}
				}
			}
			onChange(newValues, isValid, index)
		}
		
		const date = {
			value: values.dateFrom === undefined ? '' : moment(values.dateFrom.value, ['DD/MM/YYYY', 'YYYY-M-D']).format('YYYY-M-D'),
			isValid: values.dateFrom === undefined ? false : values.dateFrom.isValid
		}

	
		return (
			<Fragment>

				{ index !== 0 && 
				<Fragment>
					<h3>Tell us your previous address</h3>
					<TextInputContainer
						label="Address line 1"
						name='addressLine1'
						type="text"
						id='addressLine1'
						maxLength={60}
						value={values.address === undefined || values.address.addressLine1 === undefined ? '' : values.address.addressLine1.value}
						optional={false}
						onChange={onComponentChange}
					/>
					<TextInputContainer
						label="Address line 2"
						name='addressLine2'
						type="text"
						id='addressLine2'
						maxLength={60}
						value={values.address === undefined || values.address.addressLine2 === undefined ? '' : values.address.addressLine2.value}
						optional
						onChange={onComponentChange}
					/>
					<TextInputContainer
						label="City or town"
						name='town'
						type="text"
						id='town'
						maxLength={60}
						value={values.address === undefined || values.address.town === undefined ?  '' : values.address.town.value}
						optional={false}
						onChange={onComponentChange}
					/>
					<TextInputContainer
						label="County or province"
						name='county'
						type="text"
						id='county'
						maxLength={60}
						value={values.address === undefined || values.address.county === undefined ?  '' : values.address.county.value}
						optional
						onChange={onComponentChange}
					/>
					<SelectInputContainer
						label='Country'
						name='country'
						id='country'
						value={values.address === undefined || values.address.country === undefined ?  '' : values.address.country.value}
						options={country}
						onChange={onComponentChange}
						placeholder='Select a country...'
					/>
					<TextInputContainer
						label="Postcode"
						name='postcode'
						type="text"
						id='postcode'
						maxLength={60}
						value={values.address === undefined || values.address.postcode === undefined ?  '' : values.address.postcode.value}
						optional
						hideOptional
						onChange={onComponentChange}
					/> 
				</Fragment>
				}
				<MemorableDateInputContainer 
					showDay={false}
					heading={index == 0 ? 'Tell us when you moved into your current address' : 'Tell us when you moved into this address'}
					description='For example, 3 1980'
					onChange={onComponentChange}
					name='dateFrom'
					value={date.value}
					customValidation={{
                        invalidAfterDate: moment(),
                        customValidationMessage: 'Check the date and try again'
                    }}
				/>
				
			</Fragment>
		)
	} 

	const dateMinusTenYears = moment().subtract(10, 'years').format('MMMM YYYY')
	const alertContent = 'You must tell us where you’ve lived since ' + `${dateMinusTenYears}` + ', starting with the most recent address and working backwards.'

	return (
		<Fragment>
			<h1>Your fostering journey</h1>
            <h2>Your address history</h2>
			{ showAddMoreOnFirstComponent && 
					<AlertForm
					level='information'
					content={alertContent}
			/>}
			{secondApplicant && <p className='h3'>{firstName.value} {lastName.value}</p>}
			<form onSubmit={onSubmit}>
				<ComponentsList
					key={currentApplicant} 
					onChange={onAddressChange}
					addItemMessage='Add another address'
					removeItemMessage='Remove this address'
					showAddMoreButton={!displayAddAnotherOnFirstAddress()}
					renderComponent={renderComponent}
					values={addressHistory.value}
					showRemoveonAllExceptFirstComponent={true}
					showRemoveOnAllComponents={false}
					showAddMoreOnFirstComponent={showAddMoreOnFirstComponent}
				/>
				<SubmitButton
					history={history}
					onSaveAndGoBackClick={onSaveAndGoBackClick}
					isLoading={isLoading}
					isValid={isFormValid()}
				/>
			</form>
		</Fragment>
	)
}

YourAddressHistory.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default YourAddressHistory