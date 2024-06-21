import * as originalModule from '@mnrendra/read-package'

const { readPackage } = originalModule as jest.Mocked<typeof originalModule>

export default readPackage
