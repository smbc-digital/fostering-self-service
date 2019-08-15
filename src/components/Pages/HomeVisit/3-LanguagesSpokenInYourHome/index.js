import React, { useContext, Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextInputContainer, TextAreaInputContainer } from 'smbc-react-components'
import { Context } from 'context'
import { updateHomeVisitForm, HomeVisitFormName, updateFormStatus, StageName } from 'helpers'
import SubmitButton from 'components/SubmitButton'
import { PARTNERSHIP_STATUS, FOSTERING_HISTORY, START_PAGE } from 'routes'

const LanguagesSpokenInYourHome = ({ history }) => {
	const context = useContext(Context)
	const {onChange, onChangeStatus, primaryLanguage, otherLanguages, withPartner } = context
	const [isLoading, setIsLoading] = useState(false)

	const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.LanguagesSpokenInYourHome, {
                primaryLanguage: context.primaryLanguage,
                otherLanguages: context.otherLanguages
            })
    
            onChangeStatus('languageSpokenInYourHomeStatus', status)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
	}
	
	const onSubmit = event => {
		event.preventDefault()

        if(withPartner.value === 'Yes') {
            handleFormUpdate(PARTNERSHIP_STATUS)
        }
        else {
            handleFormUpdate(FOSTERING_HISTORY)
        }
    }
    
    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.LanguagesSpokenInYourHome,
            stage: StageName.HomeVisit,
            currentStatus:context.statuses.languageSpokenInYourHomeStatus,
            setStatus: newStatus => context.onChangeStatus('languageSpokenInYourHomeStatus', newStatus)
        })
    }, [])

	const onSaveAndGoBackClick = event => {
        event.stopPropagation()
        event.preventDefault()

        handleFormUpdate(START_PAGE)
    } 

	return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Tell us about the languages that are spoken in your home</h2>
            <form onSubmit={onSubmit}>
                <TextInputContainer
                    label='Primary language'
                    id='primaryLanguage'
                    type='text'
                    maxLength={60}
                    value={primaryLanguage.value}
                    onChange={onChange}
                    optional={true}
                    hideOptional={true}
                    name='primaryLanguage'
                />
                <TextAreaInputContainer
                    label='List any other languages'
                    id='otherLanguages'
                    type='text'
                    maxLength={500}
                    value={otherLanguages.value}
                    onChange={onChange}
                    optional={true}
                    hideOptional={true}
                    maxLengthMessage='Your list can be up to 500 characters long'
                />
                <SubmitButton
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    history={history}
                    isLoading={isLoading}
                />          
            </form>
        </Fragment>
    )
}

LanguagesSpokenInYourHome.propTypes = {
    history: PropTypes.object
}

export default LanguagesSpokenInYourHome