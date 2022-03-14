import { testSuite } from '../../support/testSuite'

describe('native change event', () => {
	it('native change event', () => {
		const { loadEventsInput, use, hasEventsMainName, cySelectSegment } = testSuite.utils
		const cyNativeChangeEventDisplay = () => cy.get('#nativeChangeEventDisplay')
		const defaultNativeChangeText = '[native change event]'
		loadEventsInput()
			.then(hasEventsMainName('none'))
			.then(cyNativeChangeEventDisplay)
			.should('have.text', defaultNativeChangeText)
			.then(cySelectSegment('hrs12'))
			.then(use.upArrow)
			.then(hasEventsMainName('change'))
			.then(cyNativeChangeEventDisplay)
			.should('have.text', defaultNativeChangeText)
			.blur()
			.then(cyNativeChangeEventDisplay)
			.should('have.text', 'native-change')
	})
})
