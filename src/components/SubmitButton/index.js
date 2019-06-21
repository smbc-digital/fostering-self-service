import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Anchor } from 'smbc-react-components'
import { Applicant } from '../Provider'

const SubmitButton = ({ currentApplicant, secondApplicant, onSubmit, history, isLoading = false }) => {
    const onClick = (event, backToStart) => {
        event.preventDefault()

        onSubmit(backToStart)
    }

    if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
        return <Fragment>
            <Button
                label="Next step"
                isValid
                isLoading={isLoading}
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
            isLoading={isLoading}
            onButtonClick={event => onClick(event, false)} />
        <Anchor
            label='Back'
            history={history} />
        <Button
            label="Save and go back to fostering area"
            isValid
            isLoading={isLoading}
            colour='inverted'
            onButtonClick={event => onClick(event, true)}
            useLeftChevron={true} />
    </Fragment>
}

SubmitButton.propTypes = {
    currentApplicant: PropTypes.object,
    secondApplicant: PropTypes.object,
    onSubmit: PropTypes.func,
    history: PropTypes.object,
    isLoading: PropTypes.bool
}

export default SubmitButton