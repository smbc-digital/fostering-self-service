import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Anchor } from 'smbc-react-components'
import { Applicant } from '../Provider'

const SubmitButton = ({ currentApplicant, secondApplicant, onSubmit, history }) => {
    const onClick = (event, backToStart) => {
        event.preventDefault()

        onSubmit(backToStart)
    }

    if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
        return <Fragment>
            <Button
                label="Next step"
                isValid
                onButtonClick={event => onClick(event, false)} />
            <Anchor
                label='Back'
                history={history} />
        </Fragment>
    }

    return <Fragment>
        <Button
            label="Save and next step"
            isValid
            onButtonClick={event => onClick(event, false)} />
        <Anchor
            label='Back'
            history={history} />
        <Button
            label="Save and go back to fostering area"
            isValid
            colour='inverted'
            onButtonClick={event => onClick(event, true)}
            useLeftChevron={true} />
    </Fragment>
}

SubmitButton.propTypes = {
    currentApplicant: PropTypes.object,
    secondApplicant: PropTypes.object,
    onSubmit: PropTypes.func,
    history: PropTypes.object
}

export default SubmitButton