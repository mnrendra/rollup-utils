import type originalModule from '@mnrendra/read-package'

import type mockedModule from '@tests/mocks/readPackage'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

const unmock = (
  mockedModule: MockedModule
): void => {
  const actualModule: OriginalModule = jest.requireActual('@mnrendra/read-package')
  mockedModule.mockImplementation(actualModule.readPackage)
}

export default unmock
