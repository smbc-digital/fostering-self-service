import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Anchor } from 'smbc-react-components'
import { Applicant } from '../../../Provider'

const SubmitButton = ({currentApplicant, secondApplicant}) => {
    if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
        return <Fragment>
            <Button label="Next step" isValid />
            <Anchor label='Back' history={history} />
        </Fragment>
    }

    return <Fragment>
        <Button label="Save and next step" isValid />
        <Anchor label='Back' history={history} />
        <Button label="Save and go back to fostering area" isValid />
    </Fragment>
}

SubmitButton.propTypes = {
    currentApplicant: PropTypes.object,
    secondApplicant: PropTypes.object
}

export default SubmitButton