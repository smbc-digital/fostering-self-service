import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute } from '../../../../helpers'
import { Applicant } from '../../../Provider'

const MoreAboutYou = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant, secondApplicant } = context
    const { firstName, lastName, sexualOrientation } = context[currentApplicant]

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
        <Anchor label='Back' history={history}/>
    </form>
}

MoreAboutYou.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default MoreAboutYou