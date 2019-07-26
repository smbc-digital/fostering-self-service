import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextAreaInputContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from 'context'
import { updateFormStatus, FormName, getPageRoute } from 'helpers'

const AboutYourInterest = ({ history }) => {
    const { onChange, onChangeStatus, reasonsForFostering, statuses: { tellUsAboutYourInterestInFosteringStatus } } = useContext(Context)

    useEffect(() => {
        updateFormStatus(
            FormName.TellUsAboutYourInterestInFostering,
            tellUsAboutYourInterestInFosteringStatus,
            newStatus => onChangeStatus('tellUsAboutYourInterestInFosteringStatus', newStatus))
    }, [])

    const onSubmit = event => {
        event.preventDefault()
        history.push(getPageRoute(13))
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Tell us about your interest in fostering</h2>
            <form onSubmit={onSubmit}>
                <TextAreaInputContainer
                    id='reasonsForFostering'
                    label='Tell us why you&#39;re interested in fostering'
                    maxLength={2000}
                    onChange={onChange}
                    value={reasonsForFostering.value}
                />
                <Button label="Next step" isValid />
                <Anchor label='Back' history={history} />
            </form>
        </Fragment>
    )
}

AboutYourInterest.propTypes = {
    history: PropTypes.object
}

export default AboutYourInterest