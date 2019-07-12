import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import TextInputContainer from 'smbc-react-components'

const AboutOverSixteens = ({ history, match }) => {

    return(
        <Fragment>
            <h1>Your fostering journey</h1>
            <h2>Children living away from your home</h2>
            <form onSubmit={onSubmit}>
            <h3>{firstName.value} {lastName.value}</h3>
            <TextInputContainer
                label='First name'
                id='firstName'
                type='text'
                maxLength='60'
                value={values.firstName}
                onChange={onComponentChange}
                optional={true}
                hideOptional={true}
            />

             <TextInputContainer
                label='Last name'
                id='lastName'
                type='text'
                maxLength='60'
                value={values.lastName}
                onChange={onComponentChange}
                optional={true}
                hideOptional={true}
            />

            </form>
        </Fragment>
    )

}

AboutOverSixteens.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
}

export default AboutOverSixteens