import React, { useContext, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, SelectInputContainer } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute, updateForm, FormName } from '../../../../helpers'
import { Applicant } from '../../../Provider'
import SubmitButton from '../../../SubmitButton'

const MoreAboutYou = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant, secondApplicant, onChangeStatus } = context
    const { firstName, lastName, sexualOrientation, nationality, ethnicity, religion, placeOfBirth, gender } = context[currentApplicant]
    const [isLoading, setIsLoading] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.TellUsAboutYourself, {
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
            history.push(`${getPageRoute(2)}/second-applicant`)
            return
        }

        await handleFormUpdate(getPageRoute(4))
    }

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(getPageRoute(1))
    } 

    const onChange = (event, isValid) => {
        return onChangeApplicant(event, isValid, currentApplicant) 
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Tell us more about you</h2>
            {secondApplicant && <h3>{firstName.value} {lastName.value}</h3>}
            <form onSubmit={onSubmit}>
                <SelectInputContainer
                    label='Country of birth'
                    id='placeOfBirth'
                    value={placeOfBirth.value}
                    options={context.country}
                    onChange={onChange}
                />
                <SelectInputContainer
                    label='Nationality'
                    id='nationality'
                    value={nationality.value}
                    options={context.nationality}
                    onChange={onChange}
                />
                <SelectInputContainer
                    label='Ethnicity'
                    id='ethnicity'
                    value={ethnicity.value}
                    options={context.ethnicity}
                    onChange={onChange}
                />
                <TextInputContainer
                    label='Gender'
                    id='gender'
                    value={gender.value}
                    type='text'
                    maxLength='60'
                    onChange={onChange}
                    hideOptional={true}
                    optional={true}
                />
                <TextInputContainer
                    label='Religion or faith group'
                    id='religion'
                    type='text'
                    maxLength='60'
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