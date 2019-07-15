import React, { Fragment, useContext, useState } from 'react'
import { Context } from '../../../../context'
import { 
    ComponentsList,
    TextInputContainer,
    SelectInputContainer,
    MemorableDateInputContainer,
    AddressPicker } from 'smbc-react-components'

import PropTypes from 'prop-types'
import { getPageRoute, getCurrentApplicant, updateForm, FormName } from '../../../../helpers'
import moment from 'moment'
import SubmitButton from 'components/SubmitButton'
import { Applicant } from 'config'

const AboutAnyUnderSixteen = ({history, match}) => {
    const context = useContext(Context)
	const currentApplicant = getCurrentApplicant(match)
	const { childrenUnderSixteenLivingAwayFromHome, firstName, lastName } = context[currentApplicant]
	const { secondApplicant, onChangeApplicant, onChangeStatus } = context
    const [isLoading, setIsLoading] = useState(false)
    
    const onChange = (event, isValid) => {
        return onChangeApplicant(event, isValid, currentApplicant) 
    }
	
    const onPersonChange = (values, isValid) => {
        onChange({
            target: {
                name: 'childrenUnderSixteenLivingAwayFromHome',
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
	
	const onSubmit = event => {
		event.stopPropagation()
		event.preventDefault()

		if(currentApplicant == Applicant.FirstApplicant && secondApplicant){
			handleFormUpdate(`${getPageRoute(17)}/second-applicant`)
			return
		}
		handleFormUpdate(getPageRoute(19))
		return
	}

    const renderComponent = (onChange, firstInputRef, values, index) => {
        const onComponentChange = ({ target: { name, value }}) => {
            const newValues = { ...values, [name]: value }

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
                <SelectInputContainer
                    label='Gender'
                    id='gender'
                    value={values.gender}
                    options={[
                        {
                            name: 'Male',
                            value: 'Male'
                        },
                        {
                            name: 'Female',
                            value: 'Female'
                        },
                        {
                            name: 'Prefer not to say',
                            value: 'Prefer not to say'
                        }
                    ]}
                    onChange={onComponentChange}
                />
                <MemorableDateInputContainer
                    heading="Date of birth"
                    description="For example, 31 3 1980"
                    name="dateOfBirth"
                    optional
                    value={moment(values.dateOfBirth, ['DD/MM/YYYY', 'YYYY-M-D']).format('YYYY-M-D')}
                    onChange={onComponentChange}
                    hideOptionalText={true}
                />
                <AddressPicker
                    onChange={onComponentChange}
                    name="address"
                    address={values.address}
                    enableH2={true}
                    showOnlyManual={true}
                    noPostcodeValidation={true}
                    optional
                    />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            <h3>{firstName.value} {lastName.value}</h3>
            <h3>Tell us about your children under 16 who live away from your home</h3> 
            <form onSubmit={onSubmit}>
                <ComponentsList
                    onChange={onPersonChange}
                    componentName='PersonDetails'
                    addItemMessage='Add another person'
                    removeItemMessage='Remove person'
                    showAddMoreButton={childrenUnderSixteenLivingAwayFromHome.value.length < 4}
                    renderComponent={renderComponent}
                    values={childrenUnderSixteenLivingAwayFromHome.value}
                />
                <SubmitButton
                    history={history}
                    isValid
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    isLoading={isLoading}
                />
            </form>
        </Fragment>
    )
}

AboutAnyUnderSixteen.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AboutAnyUnderSixteen