import { describe, it, expect } from 'vitest'

import { createInstance, Core } from '..'

describe('Core', () => {
  it('should create an instance by using default config', () => {
    const result = createInstance()
    expect(result).toBeInstanceOf(Core)
  })
})
