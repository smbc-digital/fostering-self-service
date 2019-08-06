import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import SecondPersonalReference from './index'
import { TaskStatus } from 'helpers'
import * as helpers from 'helpers'

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
			familyReference: {
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
			},
			secondPersonalReference: {
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

    it('should push to the next page on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
		}
		
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<SecondPersonalReference history={history} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(26))
	})
	
	it('should push to error page on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
		}
		
        helpers.updateApplicationForm = jest.fn().mockImplementation(() => { throw new Error() }) 
        
        // Act
        const wrapper = mount(<SecondPersonalReference history={history} />)
        wrapper.find('form').simulate('submit')

        // Assert
        expect(history.push).toHaveBeenCalledWith('/error')
    })

	it('should call updateApplicationForm on submit', async () => {
        //Arrange
        const history = {
            push: jest.fn()
		}
		
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        //Act
        const wrapper = mount(<SecondPersonalReference history={history} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        //Assert
        expect(helpers.updateApplicationForm).toHaveBeenCalled()
	})
	
	it('should call onChangeStatus on submit', async () => {
        // Arrange
        const history = {
            push: jest.fn()
		}
		
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<SecondPersonalReference history={history} />)
        await wrapper.find('form').simulate('submit')
        await Promise.resolve()

        // Assert
        expect(onChangeStatusMock).toHaveBeenCalledWith('referencesStatus', 0)
	})
	
	it('should call updateApplicationForm on save and go back click', () => {
        // Arrange
        const history = {
            push: jest.fn()
		}
		
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<SecondPersonalReference history={history} />)
        wrapper.find('button').at(2).simulate('click')

        // Assert
        expect(helpers.updateApplicationForm).toHaveBeenCalled()
	})
	
	it('should push to the start page on save and go back click', async () => {
        // Arrange
        const history = {
            push: jest.fn()
        }
        const match = {
            params: []
        }
        helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0)) 

        // Act
        const wrapper = mount(<SecondPersonalReference history={history} match={match} />)
        await wrapper.find('button').at(2).simulate('click')
        await Promise.resolve()

        // Assert
        expect(history.push).toHaveBeenCalledWith(helpers.getPageRoute(1))
    })

	it('should call onChangeApplicant', () => {
		// Arrange
        const history = {
            push: jest.fn()
        }

        // Act
        const wrapper = mount(<SecondPersonalReference history={history} />)
        wrapper.find('input').first().simulate('change')

        // Assert
        expect(onChangeApplicantMock).toHaveBeenCalled()
	})
	
	describe('snapshot', () => {
        
        it('should render correctly for single applicant', () => {
            const tree = renderer
                .create(<SecondPersonalReference history={{}} />)
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
				familyReference: {
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
				},
				secondPersonalReference: {
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
                .create(<SecondPersonalReference history={{}} />)
                .toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})