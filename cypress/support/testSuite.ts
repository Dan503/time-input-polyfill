import { TimeInputTestSuite } from '@time-input-polyfill/tests'

export const testSuite = new TimeInputTestSuite({
	localHostUrl: 'http://localhost:3000',
	primaryTestsLabel: 'Label for the primary test input', // default = 'Primary tests'
	eventTestsLabel: 'Label for the events test input', // default = 'Event tests'
})
