import React, { useContext, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor, TextInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import { getCurrentApplicant, updateFormStatus, HomeVisitFormName, StageName } from 'helpers'
import { Applicant } from 'components/Provider'
import { MORE_ABOUT_YOU } from 'routes'

const KnownByAnotherName = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeTarget, secondApplicant } = context
    const { everBeenKnownByAnotherName, firstName, lastName, anotherName } = context[currentApplicant]

    const onChange = (event, isValid) => onChangeTarget(event, isValid, currentApplicant)

    const options = [
        {
            label: 'Yes',
            id: 'have-you-been-known-yes',
            name: 'everBeenKnownByAnotherName',
            value: 'true',
            renderIfChecked: () => {
                return <TextInputContainer
                    label='Previous name'
                    id='anotherName'
                    type='text'
                    maxLength='60'
                    optional={false}
                    value={anotherName.value}
                    onChange={onChange}
                />
            }
        },
        {
            label: 'No',
            id: 'have-you-been-known-no',
            name: 'everBeenKnownByAnotherName',
            value: 'false'
        }
    ]

    const onSubmit = event => {
        event.preventDefault()
        let nextPageRoute = MORE_ABOUT_YOU

        if (currentApplicant === Applicant.SecondApplicant) {
            nextPageRoute += '/second-applicant'
        }

        history.push(nextPageRoute)
    }

    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.TellUsAboutYourself,
            stage: StageName.HomeVisit,
            currentStatus:context.statuses.tellUsAboutYourselfStatus,
            setStatus: newStatus => context.onChangeStatus('tellUsAboutYourselfStatus', newStatus)
        })
    }, [])

    const radioValue = `${everBeenKnownByAnotherName.value}`

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Tell us more about you</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    displayHeading
                    header='Have you ever been known by another name?'
                    options={options}
                    onChange={onChange}
                    value={radioValue}
                />
                <Button label="Next step" isValid />
                <Anchor label='Back' history={history} />
            </form>
        </Fragment>
    )
}

KnownByAnotherName.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default KnownByAnotherName