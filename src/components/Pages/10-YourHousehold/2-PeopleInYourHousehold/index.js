import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Context } from '../../../../context'
import {
    Anchor,
    ComponentsList,
    Button,
    TextInputContainer,
    MemorableDateInputContainer
} from 'smbc-react-components'

import PropTypes from 'prop-types'
import { getPageRoute } from '../../../../helpers'
import moment from 'moment'

const PeopleInYourHousehold = ({ history }) => {
    const { onChange, otherPeopleInYourHousehold } = useContext(Context)
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        let validDOB = otherPeopleInYourHousehold.value.every((person) => {
            return person.IsDobValid !== undefined ? person.IsDobValid : true
        })
        setIsValid(validDOB)

    }, [otherPeopleInYourHousehold])

    const onSubmit = event => {
        event.preventDefault()

        history.push(getPageRoute(16))
    }

    const onPersonChange = (values, isValid) => {
        onChange({
            target: {
                name: 'otherPeopleInYourHousehold',
                value: values
            }
        }, isValid)
    }

    const renderComponent = (onChange, firstInputRef, values, index) => {
        const onComponentChange = ({ target: { name, value }}, isValid) => {
            let newValues = { ...values, [name]: value }

            if(name === 'dateOfBirth'){
                newValues = { ...newValues, IsDobValid: isValid }
            }
            onChange(newValues, isValid, index) 
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
                />
                <TextInputContainer
                    label='Relationship to you'
                    id='relationshipToYou'
                    type='text'
                    maxLength='60'
                    value={values.relationshipToYou}
                    onChange={onComponentChange}
                    optional={true}
                    hideOptional={true}
                />
                <MemorableDateInputContainer
                    heading="Date of birth"
                    description="For example, 31 3 1980"
                    name="dateOfBirth"
                    optional
                    value={moment(values.dateOfBirth, ['DD/MM/YYYY', 'YYYY-M-D']).format('YYYY-M-D')}
                    onChange={onComponentChange}
                    hideOptionalText={true}
                    customValidation={{
                        invalidAfterDate: moment(),
                        customValidationMessage: 'Check the date and try again'
                    }}
                />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Your household</h2>
            <h3>Tell us who lives in your home</h3>
            <form onSubmit={onSubmit}>
                <ComponentsList
                    onChange={onPersonChange}
                    componentName='PersonDetails'
                    addItemMessage='Add another person'
                    removeItemMessage='Remove person'
                    showAddMoreButton={otherPeopleInYourHousehold.value.length < 8}
                    renderComponent={renderComponent}
                    values={otherPeopleInYourHousehold.value}                    
                />
                <Button label="Next step" isValid={true} />
            </form>
            <Anchor label='Back' history={history} />
        </Fragment>
    )
}

PeopleInYourHousehold.propTypes = {
    history: PropTypes.object
}

export default PeopleInYourHousehold