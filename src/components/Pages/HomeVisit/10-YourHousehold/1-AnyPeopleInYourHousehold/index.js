import React, { useContext, useEffect, Fragment } from 'react'
import { Context } from 'context'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { updateFormStatus, HomeVisitFormName, StageName } from 'helpers'
import PropTypes from 'prop-types'
import { WHO_LIVES_IN_YOUR_HOME, DO_YOU_HAVE_ANY_PETS } from 'routes'

const AnyPeopleInYourHousehold = ({ history }) => {
    const { onChange, onChangeStatus, anyOtherPeopleInYourHousehold, statuses: { yourHouseholdStatus } } = useContext(Context)

    const onSubmit = event => {
        event.preventDefault()

        if(anyOtherPeopleInYourHousehold.value === 'true' || anyOtherPeopleInYourHousehold.value === true){
            history.push(WHO_LIVES_IN_YOUR_HOME)
            return
        }

        history.push(DO_YOU_HAVE_ANY_PETS)
    }

    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.YourHousehold,
            stage: StageName.HomeVisit,
            currentStatus: yourHouseholdStatus,
            setStatus: newStatus => onChangeStatus('yourHouseholdStatus', newStatus)
        })
    }, [])

    const options = [
        {
            label: 'Yes',
            id: 'any-other-people-yes',
            name: 'anyOtherPeopleInYourHousehold',
            value: 'true'
        },
        {
            label: 'No',
            id: 'any-other-people-no',
            name: 'anyOtherPeopleInYourHousehold',
            value: 'false'
        }
    ]

    return (
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Your household</h2>
            <form onSubmit={onSubmit}>
                <RadioInputsContainer 
                    onChange={onChange}
                    value={`${anyOtherPeopleInYourHousehold.value}`}
                    displayHeading
                    header='Are there other people living in your home?'
                    options={options}
                />
                <Button label="Next step" isValid={true} />
            </form>
            <Anchor label='Back' history={history} />
        </Fragment>
    )
}

AnyPeopleInYourHousehold.propTypes = {
    history: PropTypes.object
}

export default AnyPeopleInYourHousehold