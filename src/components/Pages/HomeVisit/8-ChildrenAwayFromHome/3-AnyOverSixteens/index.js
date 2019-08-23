import React, { useContext, useEffect, useState, Fragment } from 'react'
import {
    Button, 
    Anchor, 
    RadioInputsContainer 
} from 'smbc-react-components'
import PropTypes from 'prop-types'
import { 
    getCurrentApplicant,
    updateHomeVisitForm, 
    HomeVisitFormName, 
    updateFormStatus,
    StageName 
} from 'helpers'
import { Context } from 'context'
import { Applicant } from 'constants'
import { START_PAGE, CHILDREN_OVER_SIXTEEN_LIVING_AWAY, ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY } from 'routes'

const AnyOverSixteens = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { anyChildrenOverSixteen, firstName, lastName } = context[currentApplicant]
    const { secondApplicant, onChangeTarget, onChangeStatus, statuses: { childrenLivingAwayFromYourHomeStatus } } = context
    const [isLoading, setIsLoading] = useState(false)
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

    const handleFormUpdate = async nextPageRoute => {
        setIsLoading(true)

        try {
            const status = await updateHomeVisitForm(HomeVisitFormName.ChildrenLivingAwayFromYourHome, {
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

    const options = [
        {
            label: 'Yes',
            id: 'any-children-over-sixteen-yes',
            name: 'anyChildrenOverSixteen',
            value: 'true'
        },
        {
            label: 'No',
            id: 'any-children-over-sixteen-no',
            name: 'anyChildrenOverSixteen',
            value: 'false'
        }
    ]

    const onSaveAndGoBackClick = async event => {
        event.stopPropagation()
        event.preventDefault()

        await handleFormUpdate(START_PAGE)
    }

    const onSubmit = event => {
        event.preventDefault()

        if (currentApplicant == Applicant.FirstApplicant && (!anyChildrenOverSixteen.value || anyChildrenOverSixteen.value == 'false')) {
            if (!secondApplicant) {
                event.stopPropagation()
                event.preventDefault()

                handleFormUpdate(START_PAGE) //this might need to be changed
                return
            }
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(`${CHILDREN_OVER_SIXTEEN_LIVING_AWAY}/second-applicant`)
            return
        } else if (anyChildrenOverSixteen.value == 'true' || anyChildrenOverSixteen.value == true) {
            if (currentApplicant === Applicant.SecondApplicant) {
                history.push(`${ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY}/second-applicant`) 
                return
            }
            history.push(ABOUT_CHILDREN_OVER_SIXTEEN_LIVING_AWAY)    
        } else {
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(START_PAGE)  //this might need to be changed
        }
    }

    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.ChildrenLivingAwayFromYourHome,
            stage: StageName.HomeVisit,
            currentStatus: childrenLivingAwayFromYourHomeStatus,
            setStatus: newStatus => onChangeStatus('childrenLivingAwayFromYourHomeStatus', newStatus)
        })
    }, [])

    const onChange = (event, isValid) => onChangeTarget(event, isValid, currentApplicant)
    
    const radioValue = `${anyChildrenOverSixteen.value}`
    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            {secondApplicant && <p className='h3'>{firstName.value} {lastName.value}</p>}
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    onChange={onChange}
                    value={radioValue}
                    displayHeading
                    header='Do you have any children aged 16 or over living away from your home?'
                    options={options}
                />
               <Button
					label={radioValue === 'true' ? 'Next step' : 'Save and next step'}
					isValid={!saveAndGoBackClicked}
					isLoading={isLoading && !saveAndGoBackClicked}
				/>
				<Anchor label='Previous' history = { history } />
                <Button
					label="Save and go back to fostering area"
					isValid={!isLoading && !saveAndGoBackClicked && radioValue !== 'true'}
					isLoading={isLoading && saveAndGoBackClicked}
					colour='inverted'
					onButtonClick={event => {
							setSaveAndGoBackClicked(true)
							onSaveAndGoBackClick(event)
						}
					}
					useLeftChevron={true} />
            </form>
        </Fragment>
    )
}

AnyOverSixteens.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AnyOverSixteens