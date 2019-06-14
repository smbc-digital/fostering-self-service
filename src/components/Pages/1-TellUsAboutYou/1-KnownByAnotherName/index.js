import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button, Anchor } from 'smbc-react-components'
import { Context } from '../../../../context'
import { getPageRoute, getCurrentApplicant } from '../../../../helpers'
import { Applicant } from '../../../Provider'

const KnownByAnotherName = ({ history, match }) => {
    const context = useContext(Context)
    const currentApplicant = getCurrentApplicant(match)
    const { onChangeApplicant } = context
    const { everBeenKnownByAnotherName, firstName, lastName } = context[currentApplicant]

    const options = [
		{
            label: 'Yes',
			id: 'have-you-been-know-yes',
            name: 'everBeenKnownByAnotherName',
            value: 'true'
		},
		{
            label: 'No',
            id: 'have-you-been-know-no',
            name: 'everBeenKnownByAnotherName',
            value: 'false'
		}
    ]
    
    const onSubmit = event => {
        event.preventDefault()
        let nextPageRoute = getPageRoute(3)
        
        if (currentApplicant === Applicant.SecondApplicant) {
            nextPageRoute += '/second-applicant'
        }

        history.push(nextPageRoute)
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Your fostering journey</h1>
            <h2>Tell us more about you</h2>
            <p>{firstName.value} {lastName.value}</p>
            <RadioInputsContainer 
                displayHeading
                header='Have you ever been known by another name?' 
                options={options} 
                onChange={(event, isValid) => onChangeApplicant(event, isValid, currentApplicant)} 
                value={`${everBeenKnownByAnotherName.value}`}
            />
            <Button label="Next step" isValid />
            <Anchor label='Back' history={history}/>
        </form>
    )
}

KnownByAnotherName.propTypes = {
    history: PropTypes.object
}

export default KnownByAnotherName