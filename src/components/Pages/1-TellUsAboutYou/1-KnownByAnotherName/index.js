import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { RadioInputsContainer, Button } from 'smbc-react-components'
import { Applicant } from '../../../Provider'
import { Context } from '../../../../context'

const KnownByAnotherName = ({ history }) => {
    const context = useContext(Context)
    const { currentApplicant, onChangeApplicant, setApplicant } = context
    const { everBeenKnownByAnotherName, firstName } = context[currentApplicant]

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
        setApplicant(Applicant.secondApplicant)
    }

    useEffect(() => {
        history.push('/fostering/known-by-another-name')
    }, [currentApplicant])

    return (
        <form onSubmit={onSubmit}>
            <h1>Your fostering journey</h1>
            <h2>Tell us more about you</h2>
            <p>{firstName.value}</p>
            <RadioInputsContainer 
                displayHeading
                header='Have you ever been known by another name?' 
                options={options} 
                onChange={onChangeApplicant} 
                value={`${everBeenKnownByAnotherName.value}`}
            />
            <Button label="Next step" isValid />
        </form>
    )
}

KnownByAnotherName.propTypes = {
    history: PropTypes.object
}

export default KnownByAnotherName