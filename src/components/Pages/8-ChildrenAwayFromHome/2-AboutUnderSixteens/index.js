import React, { Fragment, useContext } from 'react'
import { Context } from '../../../../context'
import { 
	Anchor,
    ComponentsList,
    Button,
    TextInputContainer,
    SelectInputContainer,
    MemorableDateInputContainer } from 'smbc-react-components'

import PropTypes from 'prop-types'
import { getPageRoute, getCurrentApplicant } from '../../../../helpers'
import moment from 'moment'
import { Applicant } from '../../../../config';

const AboutAnyUnderSixteen = ({history, match}) => {
	const { onChange, childrenUnderSixteenLivingAwayFromHome } = useContext(Context)
	const currentApplicant = getCurrentApplicant(match)
	const { childrenUnderSixteenLivingAwayFromHome, firstName, lastName } = context[currentApplicant]
	const { secondApplicant, onChangeApplicant, onChangeStatus, statuses: { childrenLivingAwayFromYourHomeStatus } } = context
	const [isLoading, setIsLoading] = useState(false)
	const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

	const onChange = (event, isValid) => onChangeApplicant(event, isValid, currentApplicant)

	
    const onPersonChange = (values, isValid) => {
        onChange({
            target: {
                name: 'otherPeopleInYourHousehold',
                value: values
            }
        }, isValid)
	}
	
    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateForm(FormName.ChildrenLivingAwayFromYourHome, {
                firstApplicant: context.firstApplicant,
                secondApplicant: context.secondApplicant
            })
            onChangeStatus('childrenLivingAwayFromYourHomeStatus', status)
            setIsLoading(false)
            history.push(nextPageRoute)
        } catch (error) {
            history.push('/error')
        }
	}

	const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(getPageRoute(1))
	}
	
	const onSubmit = event => {
		event.stopPropagation()
		event.preventDefault()

		if(currentApplicant == Applicant.FirstApplicant && secondApplicant){
			handleFormUpdate(`${getPageRoute(17)}/second-applicant`)
			return
		}
		handleFormUpdate(getPageRoute(19))
		return
	}


}