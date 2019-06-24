import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Anchor } from 'smbc-react-components'
import { Applicant } from '../Provider'

const SubmitButton = ({ currentApplicant, secondApplicant, onSaveAndGoBackClick, history, isLoading = false }) => {
    if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
        return <Fragment>
            <Button
                label="Next step"
                isValid
                isLoading={isLoading}
            />
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
        />
        <Anchor
            label='Back'
            history={history} />
        <Button
            label="Save and go back to fostering area"
            isValid
            isLoading={isLoading}
            colour='inverted'
            onButtonClick={onSaveAndGoBackClick}
            useLeftChevron={true} />
    </Fragment>
}

SubmitButton.propTypes = {
    currentApplicant: PropTypes.string,
    secondApplicant: PropTypes.object,
    history: PropTypes.object,
    onSaveAndGoBackClick: PropTypes.func,
    isLoading: PropTypes.bool
}

export default SubmitButton