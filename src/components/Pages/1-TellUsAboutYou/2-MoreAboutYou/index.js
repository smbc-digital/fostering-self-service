import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, Button } from 'smbc-react-components'
import { Context } from '../../../../context'

const MoreAboutYou = () => {
    const context = useContext(Context)
    const { currentApplicant, onChangeApplicant } = context
    const { firstName, lastName, SexualOrientation } = context[currentApplicant]

    return (
    <form>
        <h1>Tell us more about you</h1>
        <p>{firstName} {lastName}</p>
        <TextInputContainer 
            label='Sexual orientation'
            id='sexualOrientartion'
            type='text'
            maxLength='60'
            optional={true}
            value={SexualOrientation.value}
            onChange={onChangeApplicant}
        />
        <Button label="Next step" isValid />
    </form>
    )
}

export default MoreAboutYou