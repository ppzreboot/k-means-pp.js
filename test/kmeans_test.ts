import { assertEquals, assertGreater, assertGreaterOrEqual, assertLess, assertLessOrEqual } from '@std/assert'
import { k_means } from '../lib/kmeans.ts'
import { calc_range } from '../lib/utils.ts'

Deno.test('k_means()', async t => {
  const d = 3
  const k = 4
  const points = [
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
  ]
  const range = calc_range(d, points)

  const [clusters, count] = k_means({
    dimension: d,
    points,
    k,
  })
  console.log('k means count', count)

  await t.step('means.length === k', () => {
    assertEquals(clusters.length, k)
  })

  await t.step('in range', () => {
    for (const mean of clusters.map(c => c.mean)) {
      assertLessOrEqual(mean[0], range.max[0])
      assertLessOrEqual(mean[1], range.max[1])
      assertLessOrEqual(mean[2], range.max[2])
    }
  })

  await t.step('count > 0', () => {
    assertGreater(count, 0)
  })

  await t.step('clusters are not empty', () => {
    for (const c of clusters)
      assertGreater(c.indices.length, 0)
  })


  await t.step('cluster\'s points\' index', () => {
    for (const cluster of clusters) {
      for (const index of cluster.indices) {
        assertLess(index, points.length)
        assertGreaterOrEqual(index, 0)
      }
    }
  })
})
