import React, { useContext, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from 'context'
import { HomeVisitFormName, updateFormStatus, StageName } from 'helpers'
import { DATE_OF_MARRIAGE_OR_PARTNERSHIP, DATE_OF_MOVE_IN_TOGETHER, FOSTERING_HISTORY } from 'routes'

const AreYouMarried = ({ history }) => {
    const { onChange, onChangeStatus, marriedOrInACivilPartnership, statuses: { yourPartnershipStatus } } = useContext(Context)
    const marriedOrInACivilPartnershipValue = `${marriedOrInACivilPartnership.value}`

    const options = [
        {
            label: 'Yes',
            id: 'are-you-married-yes',
            name: 'marriedOrInACivilPartnership',
            value: 'true'
        },
        {
            label: 'No',
            id: 'are-you-married-no',
            name: 'marriedOrInACivilPartnership',
            value: 'false'
        }
    ]

    const onSubmit = event => {
        event.preventDefault()
        
		if (marriedOrInACivilPartnershipValue === 'true') {
            history.push(DATE_OF_MARRIAGE_OR_PARTNERSHIP)
            return
        }
        
        if (marriedOrInACivilPartnershipValue === 'false'){
            history.push(DATE_OF_MOVE_IN_TOGETHER)
            return
        }

		history.push(FOSTERING_HISTORY)
	}

    useEffect(() => {
        updateFormStatus({
            form: HomeVisitFormName.YourPartnership,
            stage: StageName.HomeVisit,
            currentStatus: yourPartnershipStatus,
            setStatus: newStatus => onChangeStatus('yourPartnershipStatus', newStatus)
        })
    }, [])

    return (
		<Fragment>
			<h1>Your fostering journey</h1>
			<h2>Your partnership status</h2>
			<form onSubmit={onSubmit}>
                <RadioInputsContainer
                    displayHeading
                    header='Are you married or in a civil partnership?'
                    options={options}
                    onChange={onChange}
                    value={`${marriedOrInACivilPartnership.value}`}
                />
                <Button label="Next step" isValid />
                <Anchor label='Previous' history={history} />
            </form>
		</Fragment>
	)
}

AreYouMarried.propTypes = {
    history: PropTypes.object
}

export default AreYouMarried