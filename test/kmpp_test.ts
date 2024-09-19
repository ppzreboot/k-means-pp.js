import { assertEquals, assertGreater, assertGreaterOrEqual, assertLessOrEqual, assertInstanceOf } from '@std/assert'
import { KMPP } from '../lib/kmpp.ts'
import type { Points } from '../lib/types.ts'
import { Result } from '../lib/kmeans.ts'

Deno.test('class KMPP', async t => {
  const k = 4
  const points = {
    dimension: 3,
    data: [
      [1,2,3],
      [0, 270, 103],
      [3,4,5],
      [0,0,0],
      [100, 200, 1],
      [0, 310, 120],
      [10, 320, 90],
      [100, 201, 3],
      [0, 300, 100],
      [1000, 2000, 1],
    ],
  }
  const kmpp = new KMPP(points)
  const result = kmpp.cluster(k, 'k_means_pp') as Result

  await t.step('is instance of Result', () => {
    assertInstanceOf(result, Result)
  })

  await t.step('k === result.means', () => {
    assertEquals(result.means.length, k)
  })

  await t.step('means is in range', () => {
    for (const mean of result.means) {
      for (let i=0; i<points.dimension; i++) {
        assertLessOrEqual(mean[i], kmpp.range.val.max[i])
        assertGreaterOrEqual(mean[i], kmpp.range.val.min[i])
      }
    }
  })

  await t.step('clusters are not empty', () => {
    for (const c of result.clusters)
      assertGreater(c.points.length, 0)
  })

  const step_name = 'kmeanspp is faster than kmeans'
  await t.step(step_name, () => {
    for (let i=0; i<10; i++) {
      const slow = kmpp.cluster(k, 'k_means') as Result
      const fast = kmpp.cluster(k) as Result
      console.log(step_name, 'round', i, {
        slow: slow.count,
        fast: fast.count,
      })
      assertLessOrEqual(fast.count, slow.count)
    }
  })
})

Deno.test('class KMPP with too few points', async t => {
  const k = 4
  const points = {
    dimension: 3,
    data: [
      [1,2,3],
      [1,2,3],
      [1,2,3],
      [1,2,3],
      [0, 270, 103],
      [0, 270, 103],
      [0, 270, 103],
      [0, 270, 103],
      [0, 270, 103],
      [3,4,5],
    ],
  }
  const kmpp = new KMPP(points)
  const result = kmpp.cluster(k, 'k_means_pp') as Points
  // console.log(result)

  await t.step('is instance of Points', () => {
    assertInstanceOf(result, Array)
  })

  await t.step('k === result.means', () => {
    assertEquals(result.length, 3)
  })

  await t.step('means is in range', () => {
    for (const mean of result) {
      for (let i=0; i<points.dimension; i++) {
        assertLessOrEqual(mean[i], kmpp.range.val.max[i])
        assertGreaterOrEqual(mean[i], kmpp.range.val.min[i])
      }
    }
  })
})