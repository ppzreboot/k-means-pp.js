import type { Point, I_points_data, Range } from './types.ts'
import { find_min, calc_squared_distance } from './utils.ts'
import { k_means, type Result } from './kmeans.ts'

/**
 * Performs the K-means++ clustering algorithm on a set of points.
 * 
 * This function implements the initialization step of K-means++, which selects initial
 * centroids in a way that improves the final clustering result compared to standard K-means.
 *
 * @param points - The input data points to be clustered.
 * @param k - The number of clusters to form.
 * @param range - The range of possible values for each dimension of the points.
 * @returns A Result object containing the final clusters, their means, and the number of iterations.
 */
export
function k_means_pp(points: I_points_data, k: number, range: Range): Result {
  /* 1. 随机一个中心点 */
  const first_mean = points.data[
    Math.floor(points.data.length * Math.random())
  ]

  /* 2. k-means++ 最初的 means */
  const pp_means = [first_mean]
  while(pp_means.length < k)
    pp_means.push(new_pp_mean(points, pp_means))

  return k_means(points, k, range, pp_means)
}

function new_pp_mean(points: I_points_data, pp_means: Point[]): Point {
  /* 1. 各 point 距各 mean 的距离 */
  const point_squared_distances = points.data.map(point => {
    const distances = pp_means.map(
      mean => calc_squared_distance(points.dimension, mean, point)
    )
    return find_min(distances)[1]
  })

  /* 2. 各 point 距各 mean 的距离总和 */
  const total_squared_distance = point_squared_distances
    .reduce((sum, b) => sum + b, 0)

  // 3. Choose a random value between 0 and totalSquaredDistance
  const threshold = Math.random() * total_squared_distance

  // 4. Select the new centroid
  let accumulator = 0
  for (let i = 0; i < points.data.length; i++) {
    accumulator += point_squared_distances[i]
    if (accumulator >= threshold) {
      return points.data[i]
    }
  }

  // Fallback (should rarely happen due to floating-point precision)
  return points.data[points.data.length - 1]
}
