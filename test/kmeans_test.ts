import { assertEquals, assertGreater, assertGreaterOrEqual, assertLess, assertLessOrEqual } from '@std/assert'
import { k_means } from '../lib/kmeans.ts'
import { calc_range } from '../lib/utils.ts'

Deno.test('k_means()', async t => {
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
  const range = calc_range(points)
  const result = k_means(points, k, range)
  console.log('k means count', result.count)

  await t.step('means.length === k', () => {
    assertEquals(result.means.length, k)
    assertEquals(result.clusters.length, k)
  })

  await t.step('in range', () => {
    for (const mean of result.means) {
      assertLessOrEqual(mean[0], range.max[0])
      assertLessOrEqual(mean[1], range.max[1])
      assertLessOrEqual(mean[2], range.max[2])
    }
  })

  await t.step('count > 0', () => {
    assertGreater(result.count, 0)
  })

  await t.step('clusters are not empty', () => {
    for (const c of result.clusters)
      assertGreater(c.points.length, 0)
  })


  await t.step('cluster\'s points\' index', () => {
    for (const cluster of result.clusters) {
      for (const el of cluster.points) {
        assertLess(el.index, points.data.length)
        assertGreaterOrEqual(el.index, 0)
      }
    }
  })
})
