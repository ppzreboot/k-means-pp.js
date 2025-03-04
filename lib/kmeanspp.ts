import type { I_cluster, I_point, I_range, I_quantify } from './types.ts'
import { find_min, calc_squared_distance, calc_range } from './utils.ts'
import { k_means } from './kmeans.ts'

export
interface I_k_means_pp_opts {
  /** the dimension of the points */
  dimension: number
  /** data points: Check points with `has_enough_unique_points` before. */
  points: I_point[]
  /** number of means */
  k: number
  /** boundaries of the data space */
  range?: I_range
  /** algorithm to quantify difference of points (default to Euclidian Distance) */
  quantify: I_quantify
}

/**
 * K-means++ clustering algorithm
 * @returns [the k clusters, the count of iterations]
 */
export
function k_means_pp(opts: I_k_means_pp_opts): [I_cluster[], number] {
  let { dimension, points, k, range, quantify } = opts
  range ??= calc_range(dimension, points)
  quantify ??= calc_squared_distance

  /* 1. 随机一个中心点 */
  const first_mean = points[
    Math.floor(points.length * Math.random())
  ]

  /* 2. k-means++ 最初的 means */
  const pp_means = [first_mean]
  while(pp_means.length < k)
    pp_means.push(new_pp_mean(dimension, points, pp_means, quantify))

  return k_means({
    dimension,
    points,
    k,
    range,
    means: pp_means,
    quantify,
  })
}

function new_pp_mean(d: number, points: I_point[], pp_means: I_point[], quantify: I_quantify): I_point {
  // 1. 各 point 距各 mean 的距离
  const point_distances = points.map(point => {
    const distances = pp_means.map(
      mean => quantify(d, mean, point)
    )
    return find_min(distances)[1]
  })

  // 2. 各 point 距各 mean 的距离总和
  const total_distance = point_distances
    .reduce((sum, b) => sum + b, 0)

  // 3. Choose a random value between 0 and totalSquaredDistance
  const threshold = Math.random() * total_distance

  // 4. Select the new centroid
  let accumulator = 0
  for (let i = 0; i < points.length; i++) {
    accumulator += point_distances[i]
    if (accumulator >= threshold) {
      // console.debug(`new pp mean at ${i}/${points.length}`)
      return points[i]
    }
  }

  // Fallback (should rarely happen due to floating-point precision)
  return points.at(-1)!
}
