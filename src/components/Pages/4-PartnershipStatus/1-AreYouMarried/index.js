import React, { useContext, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getPageRoute, FormName, updateFormStatus } from '../../../../helpers'

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

    const onSubmit = () => {
		if (marriedOrInACivilPartnershipValue === 'true') {
            history.push(getPageRoute(8))
            return
        }
        
        if (marriedOrInACivilPartnershipValue === 'false'){
            history.push(getPageRoute(9))
            return
        }

		history.push(getPageRoute(10))
	}

    useEffect(() => {
        updateFormStatus(
            FormName.YourPartnership,
            yourPartnershipStatus,
            newStatus => onChangeStatus('yourPartnershipStatus', newStatus))
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
                <Anchor label='Back' history={history} />
            </form>
		</Fragment>
	)
}

AreYouMarried.propTypes = {
    history: PropTypes.object
}

export default AreYouMarried