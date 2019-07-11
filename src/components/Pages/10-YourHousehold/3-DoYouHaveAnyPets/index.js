import React, { useContext, Fragment, useState } from 'react'
import { Context } from '../../../../context'
import { RadioInputsContainer, TextAreaInputContainer } from 'smbc-react-components'
import { getPageRoute, updateForm, FormName } from '../../../../helpers'
import PropTypes from 'prop-types'
import SubmitButton from '../../../SubmitButton'

const DoYouHaveAnyPets = ({ history }) => {
    const {
        onChange,
        doYouHaveAnyPets,
        petsInformation,
        onChangeStatus,
        otherPeopleInYourHousehold,
        anyOtherPeopleInYourHousehold } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.YourHousehold, {
                doYouHaveAnyPets,
                petsInformation,
                otherPeopleInYourHousehold,
                anyOtherPeopleInYourHousehold
            })

            onChangeStatus('yourHouseholdStatus', status)

            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }

    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()

        handleFormUpdate(getPageRoute(1))
    }

    const onSubmit = event => {
        event.preventDefault()

        handleFormUpdate(getPageRoute(26))
    }

    const options = [
        {
            label: 'Yes',
            id: 'do-you-have-any-pets-yes',
            name: 'doYouHaveAnyPets',
            value: 'true'
        },
        {
            label: 'No',
            id: 'do-you-have-any-pets-no',
            name: 'doYouHaveAnyPets',
            value: 'false'
        }
    ]

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Your household</h2>
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    onChange={onChange}
                    value={`${doYouHaveAnyPets.value}`}
                    displayHeading
                    header='Do you have any pets?'
                    options={options}
                />
                {
                    (doYouHaveAnyPets.value === true ||
                        doYouHaveAnyPets.value === 'true') &&
                    <TextAreaInputContainer
                        id='petsInformation'
                        label='List the pets in your home'
                        value={petsInformation.value}
                        onChange={onChange}
                        optional={true}
                        hideOptional={true}
                        maxLength={500}
                        maxLengthMessage='You have 500 characters'
                    />
                }
                <SubmitButton
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    history={history}
                    isLoading={isLoading}
                />
            </form>
        </Fragment>
    )
}

DoYouHaveAnyPets.propTypes = {
    history: PropTypes.object
}

export default DoYouHaveAnyPets