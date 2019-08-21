import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Anchor } from 'smbc-react-components'
import { Applicant } from 'constants'

const SubmitButton = ({ currentApplicant, secondApplicant, onSaveAndGoBackClick, history, isValid, isLoading }) => {
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

    if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
        return <Fragment>
            <Button
                label="Next step"
                isValid={isValid}
                isLoading={isLoading}
            />
            <Anchor
                label='Previous'
                history={history} />
        </Fragment>
    }

    return <Fragment>
        <Button
            label="Save and next step"
            isValid={!saveAndGoBackClicked && isValid}
            isLoading={isLoading && !saveAndGoBackClicked}
        />
        <Anchor
            label='Previous'
            history={history} />
        <Button
            label="Save and go back to fostering area"
            isValid={!isLoading && !saveAndGoBackClicked && isValid}
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
    isValid: PropTypes.bool,
    isLoading: PropTypes.bool
}

SubmitButton.defaultProps = {
    isLoading: false,
    isValid: true
}

export default SubmitButton