import { assertEquals, assertGreater, assertGreaterOrEqual, assertLessOrEqual, assertInstanceOf } from '@std/assert'
import { k_means_pp } from '../lib/kmeanspp.ts'
import { calc_range } from "../lib/utils.ts";
import { k_means } from "../lib/kmeans.ts";

Deno.test('k_means_pp', async t => {
  const k = 4
  const d = 3
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

  const [clusters, count] = k_means_pp(d, points, k, range)

  await t.step('k === result.means', () => {
    assertEquals(clusters.length, k)
  })

  await t.step('means is in range', () => {
    for (const c of clusters) {
      for (let i=0; i<d; i++) {
        assertLessOrEqual(c.mean[i], range.max[i])
        assertGreaterOrEqual(c.mean[i], range.min[i])
      }
    }
  })

  await t.step('clusters are not empty', () => {
    for (const c of clusters)
      assertGreater(c.indices.length, 0)
  })

  const step_name = 'kmeanspp is faster than kmeans'
  await t.step(step_name, () => {
    for (let i=0; i<10; i++) {
      const [_1, slow] = k_means(d, points, 5)
      const [_2, fast] = k_means_pp(d, points, 5)
      console.log(step_name, 'round', i, {
        slow: slow,
        fast: fast,
      })
      assertLessOrEqual(fast, slow)
    }
  })
})
