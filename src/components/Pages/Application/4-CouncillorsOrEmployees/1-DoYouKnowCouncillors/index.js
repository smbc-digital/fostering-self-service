import React, { Fragment, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Anchor, RadioInputsContainer, Button } from 'smbc-react-components'
import { Context } from 'context'
import { 
    getCurrentApplicant, 
    updateApplicationForm,
    updateFormStatus, 
    ApplicationFormName,
    StageName
} from 'helpers'
import { 
    ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES,
    RELATIONSHIP_TO_COUNCIL_EMPLOYEES,
    START_PAGE
} from 'routes'
import { Applicant } from 'constants'

const DoYouKnowCouncillors = ({ history, match }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)
    const currentApplicant = getCurrentApplicant(match)
    const { 
        firstApplicant, 
        secondApplicant, 
        onChangeTarget,
        onChangeStatus,
        statuses: { councillorsOrEmployeesStatus },
        [currentApplicant]: { hasContactWithCouncillor, firstName, lastName }
    } = useContext(Context)
    
    useEffect(() => {
        updateFormStatus({
            form: ApplicationFormName.Councillors,
            stage: StageName.Application,
            currentStatus: councillorsOrEmployeesStatus,
            setStatus: newStatus => onChangeStatus('councillorsOrEmployeesStatus', newStatus)
        })
    }, [])

    const hasContactWithCouncillorRadioValue = `${hasContactWithCouncillor.value}`
    const isSavingAllowed = !secondApplicant || currentApplicant === Applicant.SecondApplicant

    const options = [
        {
            label: 'Yes',
            id: 'has-contact-with-councillor-yes',
            name: 'hasContactWithCouncillor',
            value: 'true'
        },
        {
            label: 'No',
            id: 'has-contact-with-councillor-no',
            name: 'hasContactWithCouncillor',
            value: 'false'
        }
    ]

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateApplicationForm(ApplicationFormName.Councillors, {
                firstApplicant,
                secondApplicant
            })
            onChangeStatus('councillorsOrEmployeesStatus', status)
            history.push(nextPageRoute)
            setIsLoading(false)
        } catch(error) {
            history.push('/error')
        }
    }

    const onSubmit = event => {
        event.preventDefault()

        if (hasContactWithCouncillorRadioValue === 'true') {
            let nextPageRoute = ABOUT_RELATIONSHIP_TO_COUNCIL_EMPLOYEES

            if (currentApplicant === Applicant.SecondApplicant) {
                nextPageRoute += '/second-applicant'
            }

            history.push(nextPageRoute)
            return
        }

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${RELATIONSHIP_TO_COUNCIL_EMPLOYEES}/second-applicant`)
            return
        }

        handleFormUpdate(START_PAGE)
    }

    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()

        handleFormUpdate(START_PAGE)
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Personal relationships with local councillors or council employees</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    displayHeading
                    header='Do you have a personal relationship with a local councillor or council employee?'
                    value={hasContactWithCouncillorRadioValue}
                    onChange={(event, isValid) => onChangeTarget(event, isValid, currentApplicant)}
                    options={options}
                />
                <Button
                    label={hasContactWithCouncillorRadioValue === 'false' && isSavingAllowed ? 'Save and next step' : 'Next step'}
                    isValid={!saveAndGoBackClicked && hasContactWithCouncillor.isValid}
                    isLoading={isLoading && !saveAndGoBackClicked}
                />
                <Anchor label='Previous' history={history} />
                {isSavingAllowed && <Button
                    label="Save and go back to fostering area"
                    isValid={!isLoading && !saveAndGoBackClicked && hasContactWithCouncillorRadioValue === 'false'  && hasContactWithCouncillor.isValid && isSavingAllowed}
                    isLoading={isLoading && saveAndGoBackClicked}
                    colour={hasContactWithCouncillorRadioValue !== 'false' ? 'disabled' : 'inverted'}
                    onButtonClick={event => {
                            setSaveAndGoBackClicked(true)
                            onSaveAndGoBackClick(event)
                        }
                    }
                    useLeftChevron
                />}
            </form>
        </Fragment>
    )
}

DoYouKnowCouncillors.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default DoYouKnowCouncillors