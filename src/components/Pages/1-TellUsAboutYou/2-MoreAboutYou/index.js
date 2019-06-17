import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, Button, Anchor, SelectInputContainer } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute } from '../../../../helpers'
import { Applicant } from '../../../Provider'

const MoreAboutYou = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant, secondApplicant } = context
    const { firstName, lastName, sexualOrientation, nationality, ethnicity, countryOfBirth } = context[currentApplicant]

    const onSubmit = event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${getPageRoute(2)}/second-applicant`)
            return
        }

        history.push(getPageRoute(1))
    }

    return <form onSubmit={onSubmit}>
        <h1>Tell us more about you</h1>
        <p>{firstName.value} {lastName.value}</p>
        <SelectInputContainer
            label='Country of birth'
            id='countryOfBirth'
            value={countryOfBirth.value}
            options={context.nationality}
            onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
        />
        <SelectInputContainer
            label='Nationality'
            id='nationality'
            value={nationality.value}
            options={context.nationality}
            onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
        />
        <SelectInputContainer
            label='Ethnicity'
            id='ethnicity'
            value={ethnicity.value}
            options={context.ethnicity}
            onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
        />
        <SelectInputContainer
            label='Gender'
            id='gender'
            value={nationality.value}
            options={[
                {
                    name: 'male',
                    value: 'Male'
                },
                {
                    name: 'female',
                    value: 'Female'
                },
                {
                    name: 'prefer not to say',
                    value: 'Prefer not to say'
                }
            ]}
            onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
        />
        <TextInputContainer
            label='Sexual orientation'
            id='sexualOrientation'
            type='text'
            maxLength='60'
            optional={true}
            value={sexualOrientation.value}
            onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)}
        />
        <Button label="Next step" isValid />
        <Anchor label='Back' history={history} />
    </form>
}

MoreAboutYou.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default MoreAboutYou