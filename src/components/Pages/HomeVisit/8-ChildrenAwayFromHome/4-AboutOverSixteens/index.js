import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Context } from 'context'
import { 
    ComponentsList,
    TextInputContainer,
    MemorableDateInputContainer,
    AddressPicker 
} from 'smbc-react-components'
import PropTypes from 'prop-types'
import { getCurrentApplicant, updateHomeVisitForm, HomeVisitFormName } from 'helpers'
import moment from 'moment-timezone'
import SubmitButton from 'components/SubmitButton'
import { Applicant } from 'constants'
import { START_PAGE, CHILDREN_OVER_SIXTEEN_LIVING_AWAY } from 'routes'

const AboutOverSixteens = ({history, match}) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { childrenOverSixteenLivingAwayFromHome, firstName, lastName } = context[currentApplicant]
	const { secondApplicant, onChangeTarget, onChangeStatus } = context
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        let validDOB = childrenOverSixteenLivingAwayFromHome.value.every((person) => {
            return person.IsDobValid !== undefined ? person.IsDobValid : true 
        })
        setIsValid(validDOB)
    }, [childrenOverSixteenLivingAwayFromHome])
    
    const onChange = (event, isValid) => {
        return onChangeTarget(event, isValid, currentApplicant) 
    }
	
    const onPersonChange = (values, isValid) => {
        onChange({
            target: {
                name: 'childrenOverSixteenLivingAwayFromHome',
                value: values
            }
        }, isValid)
    }
    
    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.ChildrenLivingAwayFromYourHome, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })
            onChangeStatus('childrenLivingAwayFromYourHomeStatus', status)
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
	
	const onSubmit = async event => {
		event.stopPropagation()
		event.preventDefault()

		if(currentApplicant == Applicant.FirstApplicant && secondApplicant){
			handleFormUpdate(`${CHILDREN_OVER_SIXTEEN_LIVING_AWAY}/second-applicant`)
			return
		}
		await handleFormUpdate(START_PAGE)
		return
	}

    const renderComponent = (onChange, firstInputRef, values, index) => {
        const onComponentChange = ({ target: { name, value }}, isValid) => {
            let newValues = { ...values, [name]: value }

            if(name === 'dateOfBirth'){
               newValues = {...newValues, IsDobValid: isValid}
            }
            onChange(newValues, true, index)
        }

        return (
            <Fragment>
                <TextInputContainer
                    inputRef={firstInputRef}
                    label='First name'
                    id='firstName'
                    type='text'
                    maxLength={60}
                    value={values.firstName}
                    onChange={onComponentChange}
                    optional={true}
                    hideOptional={true}
                />
                <TextInputContainer
                    label='Last name'
                    id='lastName'
                    type='text'
                    maxLength={60}
                    value={values.lastName}
                    onChange={onComponentChange}
                    optional={true}
                    hideOptional={true}
                />
                <TextInputContainer
                    label='Gender'
                    id='gender'
                    type='text'
                    maxLength={60}
                    value={values.gender}
                    onChange={onComponentChange}
                    optional={true}
                    hideOptional={true}
                />
                <MemorableDateInputContainer
                    heading="Date of birth"
                    description="The person must be 16 or over"
                    additionalDescription="For example, 31 3 1990"
                    name="dateOfBirth"
                    optional
                    value={moment(values.dateOfBirth, ['DD/MM/YYYY', 'YYYY-M-D']).format('YYYY-M-D')}
                    onChange={onComponentChange}
                    hideOptionalText={true}
                    customValidation={{
                        invalidAfterDate: moment().subtract(16, 'years'),
                        customValidationMessage: 'Check the date and try again'
                    }}
                />

                <AddressPicker
                    onChange={onComponentChange}
                    address={values.address}
                    showOnlyManual={true}
                    maxLength={60}
                    name='address'
                    noPostcodeValidation={true}
                    optional
                    hideLine2OptionalText={true}
                    requiredFullAddressIfOptional={false}
                    hideOptional={true}
                    />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            {secondApplicant && <p className='h3'>{firstName.value} {lastName.value}</p>}
            <h3>Tell us about your children aged 16 or over living away from your home</h3> 
            <form onSubmit={onSubmit}>
                <ComponentsList
                    onChange={onPersonChange}
                    addItemMessage='Add another person'
                    removeItemMessage='Remove person'
                    showAddMoreButton={childrenOverSixteenLivingAwayFromHome.value.length < 4}
                    renderComponent={renderComponent}
                    values={childrenOverSixteenLivingAwayFromHome.value}
                />
                <SubmitButton
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    isValid={isValid}
                    history={history}
                    isLoading={isLoading}
                />
            </form>
        </Fragment>
    )
}

AboutOverSixteens.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AboutOverSixteens