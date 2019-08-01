import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import FirstPersonalReference from './index'
import { TaskStatus } from 'helpers'
import { getPageRoute } from '../../../../../helpers'

describe('FirstPersonalReference', () => {

	const onChangeStatusMock = jest.fn()
	const onChangeApplicantMock = jest.fn()

	beforeEach(() => {
		jest.resetAllMocks()
		useContextMock.mockReturnValue({
			statuses: {
				referencesStatus: TaskStatus.Completed
			},
			onChangeStatus: onChangeStatusMock,
			onChangeApplicant: onChangeApplicantMock,
			firstApplicant: {
				firstName: {
                    value: 'test',
                    isValid: true
                },
                lastName: {
                    value: 'test',
                    isValid: true
                }
			},
			secondApplicant: null,
			firstPersonalReference: {
				firstName: {
                    value: 'refname',
                    isValid: true
                },
                lastName: {
                    value: 'reflastname',
                    isValid: true
				},
				relationshipToYou: {
					value: 'relationship',
					isValid: true
				},
				numberOfYearsKnown: {
					value: 'ten',
					isValid: true
				},
				emailAddress: {
					value: 'email',
					isValid: true
				},
				phoneNumber: {
					value: 'phone',
					isValid: true
				},
				address: {
					value: {
						placeRef: '123'
					},
					isValid: true
				}
			}
		})
	})

	it('should push to next page on submit', () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const wrapper = mount(<FirstPersonalReference history={history}/>)

		// Act
		wrapper.find('Button').at(0).simulate('submit')

		// Assert
		expect(history.push).toHaveBeenCalledWith(getPageRoute(25))
	})

	it('should call onChangeApplicant', () => {
		// Arrange
        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<FirstPersonalReference history={history} />)
        wrapper.find('input').first().simulate('change')

        // Assert
        expect(onChangeApplicantMock).toHaveBeenCalled()
	})
	
	describe('snapshot', () => {
        
        it('should render correctly for single applicant', () => {
            const tree = renderer
                .create(<FirstPersonalReference history={{}} />)
                .toJSON()

            expect(tree).toMatchSnapshot()
		})
		
		it('should render correctly for joint applicant', () => {
			useContextMock.mockReturnValue({
				statuses: {
				referencesStatus: TaskStatus.Completed
				},
				onChangeStatus: onChangeStatusMock,
				onChangeApplicant: onChangeApplicantMock,
				firstApplicant: {
					firstName: {
						value: 'test',
						isValid: true
					},
					lastName: {
						value: 'test',
						isValid: true
					}
				},
				secondApplicant: {
					firstName: {
						value: 'test',
						isValid: true
					},
					lastName: {
						value: 'test',
						isValid: true
					}
				},
				firstPersonalReference: {
					firstName: {
						value: 'refname',
						isValid: true
					},
					lastName: {
						value: 'reflastname',
						isValid: true
					},
					relationshipToYou: {
						value: 'relationship',
						isValid: true
					},
					numberOfYearsKnown: {
						value: 'ten',
						isValid: true
					},
					emailAddress: {
						value: 'email',
						isValid: true
					},
					phoneNumber: {
						value: 'phone',
						isValid: true
					},
					address: {
						value: {
							placeRef: '123'
						},
						isValid: true
					}
				}
			})
			
			const tree = renderer
                .create(<FirstPersonalReference history={{}} />)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})