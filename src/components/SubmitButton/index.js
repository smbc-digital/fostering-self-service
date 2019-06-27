import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Anchor } from 'smbc-react-components'
import { Applicant } from '../Provider'

const SubmitButton = ({ currentApplicant, secondApplicant, onSaveAndGoBackClick, history, isLoading = false }) => {
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

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
            isValid={!saveAndGoBackClicked}
            isLoading={isLoading && !saveAndGoBackClicked}
        />
        <Anchor
            label='Back'
            history={history} />
        <Button
            label="Save and go back to fostering area"
            isValid={!isLoading && !saveAndGoBackClicked}
            isLoading={isLoading && saveAndGoBackClicked}
            colour='inverted'
            onButtonClick={event => {
                    setSaveAndGoBackClicked(true)
                    onSaveAndGoBackClick(event)
                }
            }
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