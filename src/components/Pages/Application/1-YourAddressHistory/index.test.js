import { React, mount, useContextMock, renderer } from 'helpers/SetupTest'
import { act } from 'react-dom/test-utils'
import YourAddressHistory from './index'
import { Applicant } from 'constants'
import * as helpers from 'helpers'
import { START_PAGE, ABOUT_YOUR_GP, ADDRESS_HISTORY } from 'routes'

describe('YourAddressHistory', () => {
	const onChangeStatusMock = jest.fn()
	const onChangeTargetMock = jest.fn()

	beforeEach(() => {
		useContextMock.mockReturnValue({
			currentApplicant: Applicant.FirstApplicant,
			onChangeStatus: onChangeStatusMock,
			onChangeTarget: onChangeTargetMock,
			statuses: {
				addressHistoryStatus: 0
			},
			firstApplicant: {
				firstName: {
					value: 'First',
					isValid: true
				},
				lastName: {
					value: 'Applicant',
					isValid: true
				},
				addressHistory: {
					value: [{
						address: {
							addressLine1: {
								value: 'addressLine1',
								isValid: true
							},
							addressLine2: {
								value: 'addressLine2',
								isValid: true
							},
							town: {
								value: 'town',
								isValid: true
							},
							county: {
								value: 'county',
								isValid: true
							},
							country: {
								value: 'country',
								isValid: true
							},
							postcode: {
								value: 'postcode',
								isValid: true
							}
						},
						dateFrom: {
							value: '01-01-2009',
							isValid: true
						}

					}],
					isValid: true
				}
			},
			secondApplicant: {
				firstName: {
					value: 'Second',
					isValid: true
				},
				lastName: {
					value: 'Applicant',
					isValid: true
				},
				addressHistory: {
					value: [{
						address: {
							addressLine1: {
								value: 'secondaddressLine1',
								isValid: true
							},
							addressLine2: {
								value: 'secondaddressLine2',
								isValid: true
							},
							town: {
								value: 'secondtown',
								isValid: true
							},
							county: {
								value: 'secondcounty',
								isValid: true
							},
							country: {
								value: 'secondcountry',
								isValid: true
							},
							postcode: {
								value: 'secondpostcode',
								isValid: true
							}
						},
						dateFrom: {
							value: '01-06-2007',
							isValid: true
						}

					}],
					isValid: true
				}
			}
		})
	})

	it('should push to next page on submit, when single applicant', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: undefined
		}

		useContextMock.mockReturnValue({
			currentApplicant: Applicant.FirstApplicant,
			onChangeStatus: onChangeStatusMock,
			onChangeTarget: onChangeTargetMock,
			statuses: {
				addressHistoryStatus: 0
			},
			firstApplicant: {
				addressHistory: {
					value: [{
						address: {
							addressLine1: {
								value: 'addressLine1',
								isValid: true
							},
							addressLine2: {
								value: 'addressLine2',
								isValid: true
							},
							town: {
								value: 'town',
								isValid: true
							},
							county: {
								value: 'county',
								isValid: true
							},
							country: {
								value: 'country',
								isValid: true
							},
							postcode: {
								value: 'postcode',
								isValid: true
							}
						},
						dateFrom: {
							value: '01-01-2009',
							isValid: true
						}

					}],
					isValid: true
				}
			}
		})

		helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => {
			await wrapper.find('form').simulate('submit')
			await Promise.resolve()
		})

		// Assert
		expect(history.push).toHaveBeenCalledWith(ABOUT_YOUR_GP)
	})

	it('should push to YourAddressHistory on submit, when on first applicant but joint application', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: undefined
		}

		helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => {
			await wrapper.find('form').simulate('submit')
			await Promise.resolve()
		})

		// Assert
		expect(history.push).toHaveBeenCalledWith(ADDRESS_HISTORY + '/second-applicant')
	})

	it('should push to GP Details on submit, when on second applicant', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: ['second-applicant']
		}

		helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => {
			await wrapper.find('form').simulate('submit')
			await Promise.resolve()
		})

		// Assert
		expect(history.push).toHaveBeenCalledWith(ABOUT_YOUR_GP)
	})

	it('should call updateApplicationForm on form submit', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: ['second-applicant']
		}

		helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))
		
		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => {
			await wrapper.find('form').simulate('submit')
			await Promise.resolve()
		})

		// Assert
		expect(helpers.updateApplicationForm).toHaveBeenCalled()
	})

	it('should call onChangeStatus on form submit', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: ['second-applicant']
		}

		helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => {
			await wrapper.find('form').simulate('submit')
			await Promise.resolve()
		})

		// Assert
		expect(onChangeStatusMock).toHaveBeenCalledWith('addressHistoryStatus', 0)
	})

	it('should call updateApplicationForm on save and go back click', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: undefined
		}

		helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => {
			await wrapper.find('button').at(1).simulate('click')
			await Promise.resolve()
		})

		// Assert
		expect(helpers.updateApplicationForm).toHaveBeenCalled()
	})

	it('should push to start page on save and go back click', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: ['second-applicant']
		}

		helpers.updateApplicationForm = jest.fn().mockReturnValue(Promise.resolve(0))

		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => {
			await wrapper.find('button').at(1).simulate('click')
			await Promise.resolve()
		})

		// Assert
		expect(history.push).toHaveBeenCalledWith(START_PAGE)
	})

	it('should push to error page on updateApplicationForm error', async () => {
		// Arrange
		const history = {
			push: jest.fn()
		}

		const match = {
			params: undefined
		}

		helpers.updateApplicationForm = jest.fn().mockImplementation(() => { throw new Error() })

		const wrapper = mount(<YourAddressHistory history={history} match={match}/>)

		// Act
		await act(async () => await wrapper.find('form').simulate('submit'))

		// Assert
		expect(history.push).toHaveBeenCalledWith('/error')
	})

	it('should set value when dateFrom input changed', () => {
		// Arrange
		const match = {
			params: undefined
		}

		const wrapper = mount(<YourAddressHistory history={{}} match={match}/>)

		// Act
		onChangeTargetMock.mockReset()
		wrapper.find('input[name="year"]').simulate('change', { target: {value: '', name: 'year'} })

		// Assert
		expect(onChangeTargetMock).toHaveBeenCalledWith({'target': {'name': 'addressHistory', 'value': [{'address': {'addressLine1': {'isValid': true, 'value': 'addressLine1'}, 'addressLine2': {'isValid': true, 'value': 'addressLine2'}, 'country': {'isValid': true, 'value': 'country'}, 'county': {'isValid': true, 'value': 'county'}, 'postcode': {'isValid': true, 'value': 'postcode'}, 'town': {'isValid': true, 'value': 'town'}}, 'dateFrom': {'isValid': false, 'value': null}}]}}, false, 'firstApplicant')
	})

	
	it('should set value when address input changed', () => {
		// Arrange
		useContextMock.mockReturnValue({
			currentApplicant: Applicant.FirstApplicant,
			onChangeStatus: onChangeStatusMock,
			onChangeTarget: onChangeTargetMock,
			country: [{value: 'test', name: 'test'}],
			statuses: {
				addressHistoryStatus: 0
			},
			firstApplicant: {
				addressHistory: {
					value: [{
						address: {
							addressLine1: {
								value: 'addressLine1',
								isValid: true
							},
							addressLine2: {
								value: 'addressLine2',
								isValid: true
							},
							town: {
								value: 'town',
								isValid: true
							},
							county: {
								value: 'county',
								isValid: true
							},
							country: {
								value: 'country',
								isValid: true
							},
							postcode: {
								value: 'postcode',
								isValid: true
							}
						},
						dateFrom: {
							value: '01-01-2009',
							isValid: true
						}

					},
					{
						address: {
							addressLine1: {
								value: 'addressLine1',
								isValid: true
							},
							addressLine2: {
								value: 'addressLine2',
								isValid: true
							},
							town: {
								value: 'town',
								isValid: true
							},
							county: {
								value: 'county',
								isValid: true
							},
							country: {
								value: 'country',
								isValid: true
							},
							postcode: {
								value: 'postcode',
								isValid: true
							}
						},
						dateFrom: {
							value: '01-01-2009',
							isValid: true
						}

					}],
					isValid: true
				}
			}
		})

		const match = {
			params: undefined
		}

		const wrapper = mount(<YourAddressHistory history={{}} match={match}/>)

		// Act
		onChangeTargetMock.mockReset()
		wrapper.find('input[name="addressLine1"]').simulate('change', { target: {value: 'new address line 1 value', name: 'addressLine1'} })

		// Assert
		expect(onChangeTargetMock).toHaveBeenCalledWith({'target': {'name': 'addressHistory', 'value': [{'address': {'addressLine1': {'isValid': true, 'value': 'addressLine1'}, 'addressLine2': {'isValid': true, 'value': 'addressLine2'}, 'country': {'isValid': true, 'value': 'country'}, 'county': {'isValid': true, 'value': 'county'}, 'postcode': {'isValid': true, 'value': 'postcode'}, 'town': {'isValid': true, 'value': 'town'}}, 'dateFrom': {'isValid': true,
'value': '01-01-2009'}}, {'address': {'addressLine1': {'isValid': true, 'value': 'new address line 1 value'}, 'addressLine2': {'isValid': true, 'value': 'addressLine2'}, 'country': {'isValid': true, 'value': 'country'}, 'county': {'isValid': true, 'value': 'county'}, 'postcode': {'isValid': true, 'value': 'postcode'}, 'town': {'isValid': true, 'value': 'town'}}, 'dateFrom': {'isValid': true, 'value': '01-01-2009'}}]}}, true, 'firstApplicant')
	})

	it('should checkIsValid when multiple addresses', () => {
		// Arrange
		useContextMock.mockReturnValue({
			currentApplicant: Applicant.FirstApplicant,
			onChangeStatus: onChangeStatusMock,
			onChangeTarget: onChangeTargetMock,
			country: [{value: 'test', name: 'test'}],
			statuses: {
				addressHistoryStatus: 0
			},
			firstApplicant: {
				addressHistory: {
					value: [{
						address: {
							addressLine1: {
								value: 'addressLine1',
								isValid: true
							},
							addressLine2: {
								value: 'addressLine2',
								isValid: true
							},
							town: {
								value: 'town',
								isValid: true
							},
							county: {
								value: 'county',
								isValid: true
							},
							country: {
								value: 'country',
								isValid: true
							},
							postcode: {
								value: 'postcode',
								isValid: true
							}
						},
						dateFrom: {
							value: '01-01-2009',
							isValid: true
						}

					},
					{
						address: {
							addressLine1: {
								value: 'addressLine1',
								isValid: true
							},
							addressLine2: {
								value: 'addressLine2',
								isValid: true
							},
							town: {
								value: 'town',
								isValid: true
							},
							county: {
								value: 'county',
								isValid: true
							},
							country: {
								value: 'country',
								isValid: true
							},
							postcode: {
								value: 'postcode',
								isValid: true
							}
						},
						dateFrom: {
							value: '01-01-2009',
							isValid: true
						}

					}],
					isValid: true
				}
			}
		})

		const match = {
			params: undefined
		}

		const wrapper = mount(<YourAddressHistory history={{}} match={match}/>)

		// Assert
		expect(wrapper.find('Button').first().prop('disabled')).toEqual(undefined)

	})

	describe('snapshot', () => {
		it('renders firstApplicant correctly for single applicant', () => {
			useContextMock.mockReturnValue({
				currentApplicant: Applicant.FirstApplicant,
				onChangeStatus: onChangeStatusMock,
				onChangeTarget: onChangeTargetMock,
				country: [{value: 'test', name: 'test'}],
				statuses: {
					addressHistoryStatus: 0
				},
				firstApplicant: {
					addressHistory: {
						value: [{
							address: {
								addressLine1: {
									value: 'addressLine1',
									isValid: true
								},
								addressLine2: {
									value: 'addressLine2',
									isValid: true
								},
								town: {
									value: 'town',
									isValid: true
								},
								county: {
									value: 'county',
									isValid: true
								},
								country: {
									value: 'test',
									isValid: true
								},
								postcode: {
									value: 'postcode',
									isValid: true
								}
							},
							dateFrom: undefined
						}],
						isValid: false
					}
				}
			})
			
			const match = {
				params: undefined
			}

			const tree = renderer
				.create(<YourAddressHistory history={{}} match={match}/>)
				.toJSON()

			expect(tree).toMatchSnapshot()
		})

		it('renders firstApplicant correctly for single applicant when first date entered is not more than 10 years ago', () => {
			useContextMock.mockReturnValue({
				currentApplicant: Applicant.FirstApplicant,
				onChangeStatus: onChangeStatusMock,
				onChangeTarget: onChangeTargetMock,
				country: [{value: 'test', name: 'test'}],
				statuses: {
					addressHistoryStatus: 0
				},
				firstApplicant: {
					addressHistory: {
						value: [{
							address: {
								addressLine1: {
									value: 'addressLine1',
									isValid: true
								},
								addressLine2: {
									value: 'addressLine2',
									isValid: true
								},
								town: {
									value: 'town',
									isValid: true
								},
								county: {
									value: 'county',
									isValid: true
								},
								country: {
									value: 'test',
									isValid: true
								},
								postcode: {
									value: 'postcode',
									isValid: true
								}
							},
							dateFrom: {
								value: '01-01-2015',
								isValid: true
							}
						}],
						isValid: false
					}
				}
			})
			
			const match = {
				params: undefined
			}

			const tree = renderer
				.create(<YourAddressHistory history={{}} match={match}/>)
				.toJSON()

			expect(tree).toMatchSnapshot()
		})

		it('renders second applicant correctly when no data', () => {
			useContextMock.mockReturnValue({
				currentApplicant: Applicant.FirstApplicant,
				onChangeStatus: onChangeStatusMock,
				onChangeTarget: onChangeTargetMock,
				country: [{value: 'test', name: 'test'}],
				statuses: {
					addressHistoryStatus: 0
				},
				firstApplicant: {
					firstName: {
						value: 'First',
						isValid: true
					},
					lastName: {
						value: 'Applicant',
						isValid: true
					},
					addressHistory: {
						value: [{
							address: {},
							dateFrom: {}
						}],
						isValid: false
					}
				},
				secondApplicant: {
					firstName: {
						value: 'Second',
						isValid: true
					},
					lastName: {
						value: 'Applicant',
						isValid: true
					},
					addressHistory: {
						value: [{
							address: {},
							dateFrom: {
								value: '02-06-2016',
								isValid: true
							}
						}, {
							address: undefined,
							dateFrom: undefined
						}],
						isValid: false
					}
				}
			})

			const match = {
				params: ['second-applicant']
			}

			const tree = renderer
				.create(<YourAddressHistory history={{}} match={match}/>)
				.toJSON()
			
			expect(tree).toMatchSnapshot()
		})
	})
})