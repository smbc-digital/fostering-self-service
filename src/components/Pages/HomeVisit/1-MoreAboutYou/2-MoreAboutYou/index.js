import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, SelectInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import { getCurrentApplicant, updateHomeVisitForm, HomeVisitFormName } from 'helpers'
import { Applicant } from 'constants'
import SubmitButton from 'components/SubmitButton'
import { KNOWN_BY_ANOTHER_NAME, ARE_YOU_EMPLOYED, START_PAGE } from 'routes'

const MoreAboutYou = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeTarget, secondApplicant, onChangeStatus } = context
    const { firstName, lastName, nationality, ethnicity, religion, placeOfBirth, gender } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.TellUsAboutYourself, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })

            onChangeStatus('tellUsAboutYourselfStatus', status)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
    }

    const onSubmit = async event => {
        event.preventDefault()

        if (currentApplicant === Applicant.FirstApplicant && secondApplicant) {
            history.push(`${KNOWN_BY_ANOTHER_NAME}/second-applicant`)
            return
        }

        await handleFormUpdate(ARE_YOU_EMPLOYED)
    }

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(START_PAGE)
    } 

    const onChange = (event, isValid) => {
        return onChangeTarget(event, isValid, currentApplicant) 
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>More about you</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <form onSubmit={onSubmit}>
                <SelectInputContainer
                    label='Country of birth'
                    id='placeOfBirth'
                    value={placeOfBirth.value}
                    options={context.country}
                    onChange={onChange}
                    placeholder='Select a country...'
                    optional
                    hideOptionalText
                />
                <SelectInputContainer
                    label='Nationality'
                    id='nationality'
                    value={nationality.value}
                    options={context.nationality}
                    onChange={onChange}
                    placeholder='Select a nationality...'
                    optional
                    hideOptionalText
                />
                <SelectInputContainer
                    label='Ethnicity'
                    id='ethnicity'
                    value={ethnicity.value}
                    options={context.ethnicity}
                    onChange={onChange}
                    placeholder='Select an ethnicity...'
                    optional
                    hideOptionalText
                />
                <TextInputContainer
                    label='Gender'
                    id='gender'
                    value={gender.value}
                    type='text'
                    maxLength={60}
                    onChange={onChange}
                    hideOptional={true}
                    optional={true}
                />
                <TextInputContainer
                    label='Religion or faith group'
                    id='religion'
                    type='text'
                    maxLength={60}
                    value={religion.value}
                    onChange={onChange}
                    optional={true}
                    hideOptional={true}
                />
                <SubmitButton
                    currentApplicant={currentApplicant}
                    secondApplicant={secondApplicant}
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    history={history}
                    isLoading={isLoading}
                />
            </form>
        </Fragment>
    )
}

MoreAboutYou.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default MoreAboutYou