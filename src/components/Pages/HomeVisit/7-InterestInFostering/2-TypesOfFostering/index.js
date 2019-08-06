import React, { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { CheckboxInputsContainer } from 'smbc-react-components'
import { Context } from 'context'
import { getPageRoute, updateHomeVisitForm, HomeVisitFormName } from 'helpers'
import SubmitButton from 'components/SubmitButton' 

const TypesOfFostering = ({ history }) => {
    const { typesOfFostering, reasonsForFostering, onChange, onChangeStatus } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)

    const options = [
        {
            label: 'Short-term',
            id: 'short-term',
            name: 'short-term',
            value: 'shortTerm',
            checked: typesOfFostering.value.includes('shortTerm')
        },
        {
            label: 'Long-term',
            id: 'long-term',
            name: 'long-term',
            value: 'longTerm',
            checked: typesOfFostering.value.includes('longTerm')
        },
        {
            label: 'Respite care',
            id: 'respite-care',
            name: 'respite-care',
            value: 'respite',
            checked: typesOfFostering.value.includes('respite')
        },
        {
            label: 'Children with disabilities',
            id: 'children-with-disabilities',
            name: 'children-with-disabilities',
            value: 'childrenWithDisability',
            checked: typesOfFostering.value.includes('childrenWithDisability')
        },
        {
            label: 'Short breaks',
            id: 'short-breaks',
            name: 'short-breaks',
            value: 'shortBreaks',
            checked: typesOfFostering.value.includes('shortBreaks')
        },
        {
            label: 'Unsure',
            id: 'unsure',
            name: 'unsure',
            value: 'unsure',
            checked: typesOfFostering.value.includes('unsure')
        }
    ]

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)
        try {
			const status = await updateHomeVisitForm(HomeVisitFormName.TellUsAboutYourInterestInFostering, {
				reasonsForFostering,
				typesOfFostering
            })

            onChangeStatus('tellUsAboutYourInterestInFosteringStatus', status)
			history.push(nextPageRoute)
		} catch(error) {
            history.push('/error')
        }
    }

    const onSubmit = event => {
        event.preventDefault()
        handleFormUpdate(getPageRoute(14))
    }

    const onSaveAndGoBackClick = event => {
        event.preventDefault()
        event.stopPropagation()
        handleFormUpdate(getPageRoute(1))
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Tell us about your interest in fostering</h2>
            <form onSubmit={onSubmit}>
                <CheckboxInputsContainer
                    name='typesOfFostering'
                    description='Tick the types of fostering you&#39;re interested in'
                    options={options}
                    onChange={onChange}
                />
                <SubmitButton
                    history={history}
                    isValid
                    onSaveAndGoBackClick={onSaveAndGoBackClick}
                    isLoading={isLoading}
                />
            </form>
        </Fragment>
    )
}

TypesOfFostering.propTypes = {
    history: PropTypes.object
}

export default TypesOfFostering