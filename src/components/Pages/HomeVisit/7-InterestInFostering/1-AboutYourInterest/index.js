import React, { Fragment, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextAreaInputContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from 'context'
import { updateFormStatus, HomeVisitFormName, StageName } from 'helpers'
import { TYPES_OF_FOSTERING } from 'routes'

const AboutYourInterest = ({ history }) => {
    const { onChange, onChangeStatus, reasonsForFostering, statuses: { tellUsAboutYourInterestInFosteringStatus } } = useContext(Context)

    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.TellUsAboutYourInterestInFostering,
            stage: StageName.HomeVisit,
            currentStatus: tellUsAboutYourInterestInFosteringStatus,
            setStatus: newStatus => onChangeStatus('tellUsAboutYourInterestInFosteringStatus', newStatus)
        })
    }, [])

    const onSubmit = event => {
        event.preventDefault()
        history.push(TYPES_OF_FOSTERING)
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Your interest in fostering</h2>
            <form onSubmit={onSubmit}>
                <TextAreaInputContainer
                    id='reasonsForFostering'
                    label='Tell us why you&#39;re interested in fostering'
                    maxLength={2000}
                    onChange={onChange}
                    value={reasonsForFostering.value}
                />
                <Button label="Next step" isValid />
                <Anchor label='Previous' history={history} />
            </form>
        </Fragment>
    )
}

AboutYourInterest.propTypes = {
    history: PropTypes.object
}

export default AboutYourInterest