import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Context } from 'context'
import { 
    ComponentsList,
    TextInputContainer,
    MemorableDateInputContainer,
    AddressPicker 
} from 'smbc-react-components'

import PropTypes from 'prop-types'
import { getPageRoute, getCurrentApplicant, updateForm, FormName } from 'helpers'
import moment from 'moment'
import SubmitButton from 'components/SubmitButton'
import { Applicant } from '../../../Provider'

const AboutOverSixteens = ({history, match}) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { childrenOverSixteenLivingAwayFromHome, firstName, lastName } = context[currentApplicant]
	const { secondApplicant, onChangeApplicant, onChangeStatus } = context
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        let validDOB = childrenOverSixteenLivingAwayFromHome.value.every((person) => {
            return person.IsDobValid !== undefined ? person.IsDobValid : true 
        })
        setIsValid(validDOB)
    }, [childrenOverSixteenLivingAwayFromHome])
    
    const onChange = (event, isValid) => {
        return onChangeApplicant(event, isValid, currentApplicant) 
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
            const status = await updateForm(FormName.ChildrenLivingAwayFromYourHome, {
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

        await handleFormUpdate(getPageRoute(1))
	}
	
	const onSubmit = async event => {
		event.stopPropagation()
		event.preventDefault()

		if(currentApplicant == Applicant.FirstApplicant && secondApplicant){
			handleFormUpdate(`${getPageRoute(19)}/second-applicant`)
			return
		}
		await handleFormUpdate(getPageRoute(1))
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
                    label='First name'
                    id='firstName'
                    type='text'
                    maxLength='60'
                    value={values.firstName}
                    onChange={onComponentChange}
                    optional={true}
                    hideOptional={true}
                />
                <TextInputContainer
                    label='Last name'
                    id='lastName'
                    type='text'
                    maxLength='60'
                    value={values.lastName}
                    onChange={onComponentChange}
                    optional={true}
                    hideOptional={true}
                />
                <TextInputContainer
                    label='Gender'
                    id='gender'
                    type='text'
                    maxLength='20'
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
                    name='address'
                    noPostcodeValidation={true}
                    optional
                    hideLine2OptionalText={true}
                    />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <h3>Tell us about your children aged 16 or over living away from your home</h3> 
            <form onSubmit={onSubmit}>
                <ComponentsList
                    onChange={onPersonChange}
                    componentName='PersonDetails'
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