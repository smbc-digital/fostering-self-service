import { useEffect } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

export const ScrollToTop = ({ location, children }) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])

	return children
}

ScrollToTop.propTypes = {
	location: PropTypes.object,
	children: PropTypes.object,
}

export default withRouter(ScrollToTop)
