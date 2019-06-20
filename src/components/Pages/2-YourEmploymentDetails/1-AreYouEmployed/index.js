import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor} from 'smbc-react-components'
import { Context } from '../../../../context'
import { getCurrentApplicant, getPageRoute } from '../../../../helpers'
import { Applicant } from '../../../Provider'

const AreYouEmployed = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant, secondApplicant } = context
    const { firstName, lastName, areYouEmployed } = context[currentApplicant]

    const options = [
        {
            label: 'Yes',
			id: 'are-you-employed-yes',
            name: 'areYouEmployed',
            value: 'true'
		},
		{
            label: 'No',
            id: 'are-you-employed-no',
            name: 'areYouEmployed',
            value: 'false'
		}
    ]

    const onSubmit = event => {
        event.preventDefault()
        let nextPageRoute = getPageRoute(5)

        if(!areYouEmployed.value){
            if(!secondApplicant){
                history.push(getPageRoute(1))
            } else {
                nextPageRoute += '/second-applicant'
                history.push(nextPageRoute)
            }
        } else {
            if (currentApplicant === Applicant.SecondApplicant) {
                nextPageRoute += '/second-applicant'
            }
            history.push(nextPageRoute)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Your fostering journey</h1>
            <h2>Your employment details</h2>
            <p>{firstName.value} {lastName.value}</p>
            <RadioInputsContainer 
                displayHeading
                header='Are you employed?' 
                options={options} 
                onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)} 
                value={`${areYouEmployed.value}`}
            />
            <Button label="Next step" isValid />
            <Anchor label='Back' history={history}/>
        </form>
    )
}

AreYouEmployed.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AreYouEmployed