import React, { useContext, useEffect, useState, Fragment } from 'react'
import { Button, Anchor, RadioInputsContainer } from 'smbc-react-components'
import PropTypes from 'prop-types'
import { getCurrentApplicant, getPageRoute, updateForm, FormName, updateFormStatus } from 'helpers'
import { Context } from 'context';

const AnyOverSixteens = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { anyChildrenOverSixteen } = context[currentApplicant]
    const { secondApplicant, onChangeApplicant, onChangeStatus, statuses: { childrenLivingAwayFromYourHomeStatus } } = context
    const [isLoading, setIsLoading] = useState(false)
    const [saveAndGoBackClicked, setSaveAndGoBackClicked] = useState(false)

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

        await handleFormUpdate(getPageRoute(1))
    }

    const onSubmit = event => {
        event.preventDefault()

        if (currentApplicant == Applicant.FirstApplicant && (anyChildrenOverSixteen.value == false || anyChildrenOverSixteen.value == 'false')) {
            if (!secondApplicant) {
                event.stopPropagation()
                event.preventDefault()

                handleFormUpdate(getPageRoute(1))    //page --idk??
                return
            }
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(`${getPageRoute(19)}/second-applicant`) // 19 maybe need to change this. idk
            return
        } else if (anyChildrenOverSixteen.value == 'true' || anyChildrenOverSixteen == true) {
            if (currentApplicant === Applicant.SecondApplicant) {
                history.push(`${getPageRoute(20)}/second-applicant`)  // 20 need to change this??
                return
            }
            history.push(getPageRoute(20))    // 20 need to change this??
        } else {
            event.stopPropagation()
            event.preventDefault()

            handleFormUpdate(getPageRoute(1))    // page here idk
        }
    }

    useEffect(() => {
        updateFormStatus(
            FormName.ChildrenLivingAwayFromYourHome,
            childrenLivingAwayFromYourHomeStatus,
            newStatus => onChangeStatus('childrenLivingAwayFromYourHomeStatus', newStatus))
    }, [])

    const onChange = (event, isValid) => {
        return onChangeApplicant(event, isValid, currentApplicant)
    }

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            <form onSubmit={onSubmit}>
                <RadioInputsContainer
                    onChange={onChange}
                    value={`${anyChildrenOverSixteen.value}`}
                    header='Do you have any children aged 16 and over living away from your home?'
                    options={options}
                />
                <Button label="Next step" isValid={true} />
            </form>
            <Anchor label='Back' history={history} />
        </Fragment>
    )
}

AnyOverSixteens.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AnyOverSixteens