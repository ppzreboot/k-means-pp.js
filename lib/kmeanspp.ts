import type { I_cluster, I_point } from './types.ts'
import { find_min, calc_squared_distance, calc_range } from './utils.ts'
import { k_means } from './kmeans.ts'

/**
 * @param d dimension of the points
 * @param points data points: Check points with `has_enough_unique_points` before.
 * @param k number of means
 * @param range boundaries of the data space
 * @returns [the k clusters, the count of iterations]
 */
export
function k_means_pp(d: number, points: I_point[], k: number,
  range = calc_range(d, points)
): [I_cluster[], number] {
  /* 1. 随机一个中心点 */
  const first_mean = points[
    Math.floor(points.length * Math.random())
  ]

  /* 2. k-means++ 最初的 means */
  const pp_means = [first_mean]
  while(pp_means.length < k)
    pp_means.push(new_pp_mean(d, points, pp_means))

  return k_means(d, points, k, range, pp_means)
}

function new_pp_mean(d: number, points: I_point[], pp_means: I_point[]): I_point {
  // 1. 各 point 距各 mean 的距离
  const point_squared_distances = points.map(point => {
    const distances = pp_means.map(
      mean => calc_squared_distance(d, mean, point)
    )
    return find_min(distances)[1]
  })

  // 2. 各 point 距各 mean 的距离总和
  const total_squared_distance = point_squared_distances
    .reduce((sum, b) => sum + b, 0)

  // 3. Choose a random value between 0 and totalSquaredDistance
  const threshold = Math.random() * total_squared_distance

  // 4. Select the new centroid
  let accumulator = 0
  for (let i = 0; i < points.length; i++) {
    accumulator += point_squared_distances[i]
    if (accumulator >= threshold) {
      // console.debug(`new pp mean at ${i}/${points.length}`)
      return points[i]
    }
  }

  // Fallback (should rarely happen due to floating-point precision)
  return points.at(-1)!
}
