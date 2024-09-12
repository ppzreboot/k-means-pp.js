import type { Point, Points, I_points_data, Range, Cluster, Points_element } from './types.ts'
import { find_min, calc_distance, calc_mean } from './utils.ts'

/**
 * Performs the K-means clustering algorithm on a set of points.
 * 
 * @param points - The input data points to be clustered.
 * @param k - The number of clusters to form.
 * @param range - The range of possible values for each dimension of the points.
 * @param means - Optional initial cluster centroids. If not provided or insufficient, random centroids will be generated.
 * @param count - Optional counter for tracking the number of iterations. Default is 0.
 * @returns A Result object containing the final clusters, their means, and the number of iterations.
 */
export
function k_means(points: I_points_data, k: number, range: Range, means: Points = [], count = 0): Result {
  count++

  /* 中心点(means)不够时，补充随机的中心点 */
  const enough_means = means.slice()
  while(enough_means.length < k)
    enough_means.push(random_mean(range))

  /* 收敛(converge)，求出新的中心点(means) */
  const result = converge(points, enough_means, count)

  /**
   * 注意这里的 enough_means 不能用 means 代替：
   * 很多时候，明明有足够多的点，足够挑出 k 个 means，
   * 但上一步补足的 mean 恰好离所有点都远，
   * 收敛之后，刚补足的 mean 就被舍弃了，
   * 此时并不能说明“不能挑出另一个 mean”
   */
  if (is_converged(points.dimension, enough_means, result.means)) // 如果已经收敛(converged)了
    return result
  else // 否则递归
    return k_means(points, k, range, result.means, count)
}

/**
 * Performs one iteration of the K-means convergence process.
 * This function assigns each point to its nearest mean and then recalculates the means.
 *
 * @param points - The input data points to be clustered.
 * @param means - The current cluster centroids.
 * @param count - The current iteration count.
 * @returns A Result object containing the updated clusters, their new means, and the iteration count.
 */
export
function converge(points: I_points_data, means: Points, count: number): Result {
  const map = new Map<Point, Points_element[]>()
  for (const mean of means)
    map.set(mean, [])

  // 求出每个数据点 距离最近的 mean
  for (let i=0; i<points.data.length; i++) {
    const point = points.data[i]
    const [nearest_index] = find_min(
      means.map(mean => calc_distance(points.dimension, mean, point))
    )
    // point 于是 属于 mean。在下一步中，同属一个 mean 的 points 共同构成 cluster。
    map.get(means[nearest_index])!.push({ index: i, point })
  }

  // 对各 cluster 计算其 mean
  return new Result(count, points.dimension,
    Array.from(map.values()).filter(cluster => cluster.length)
  )
}

function random_mean(range: Range): Point {
  const point: number[] = []
  for (let i=0; i<range.min.length; i++) {
    const span = range.max[i] - range.min[i]
    point[i] = Math.random() * span + range.min[i]
  }
  return point
}

function is_converged(dimension: number, means_a: Points, means_b: Points) {
  const is_same_point = (a: Point, b: Point) => {
    for (let i=0; i<dimension; i++)
      if (a[i] !== b[i])
        return false
    return true
  }

  const length = means_a.length
  if (length !== means_b.length)
    return false

  for (let i=0; i<length; i++)
    if (!is_same_point(means_a[i], means_b[i]))
      return false

  return true
}

/** Represents the result of a K-means clustering operation. */
export
class Result {
  /** The final clusters, each containing a mean point and its associated points. */
  clusters: readonly Cluster[]
  /** The mean points of all clusters. */
  means: readonly Point[]
  /**
   * Creates a new Result instance.
   * 
   * @param count - The number of iterations performed in the K-means algorithm.
   * @param dimension - The dimension of the points in the clusters.
   * @param clusters - An array of clusters.
   */
  constructor(
    public readonly count: number,
    dimension: number,
    clusters: readonly Points_element[][],
  ) {
    const means: Point[] = []
    this.clusters = clusters.map(cluster => {
      const mean = calc_mean(dimension, cluster.map(({ point }) => point))
      means.push(mean)
      return { mean, points: cluster }
    })
    this.means = means
  }
}
