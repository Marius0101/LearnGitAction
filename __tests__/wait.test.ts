/**
 * Unit tests for src/wait.ts
 */

import { wait } from '../src/wait'
import { expect } from '@jest/globals'

describe('wait.ts', () => {

  it('waits with a valid number', async () => {
    const start = new Date()
    await wait(500)
    const end = new Date()

    const delta = Math.abs(end.getTime() - start.getTime())

    expect(delta).toBeGreaterThan(450)
  })
})
