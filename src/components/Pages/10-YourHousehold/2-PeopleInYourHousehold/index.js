import React, { Fragment, useContext } from 'react'
import { Context } from '../../../../context'
import {
    Anchor,
    ComponentsList,
    Button,
    TextInputContainer,
    SelectInputContainer,
    MemorableDateInputContainer
} from 'smbc-react-components'

import PropTypes from 'prop-types'
import { getPageRoute } from '../../../../helpers'
import moment from 'moment'

const PeopleInYourHousehold = ({ history }) => {
    const { onChange, otherPeopleInYourHousehold } = useContext(Context)

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
                />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Your household</h2>
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