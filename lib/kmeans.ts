import type { Point, Points, I_points_data, Range, Cluster } from './types.ts'
import { find_min, calc_distance, calc_mean } from './utils.ts'

export
function k_means(points: I_points_data, k: number, range: Range, means: Points = [], count = 0): Result {
  count++

  /* 中心点(means)不够时，补充随机的中心点 */
  const enough_means = means.slice()
  while(enough_means.length < k)
    enough_means.push(random_mean(range))

  /* 收敛(converge)，求出新的中心点(means) */
  const result = converge(points, enough_means, count)

  if (is_converged(points.dimension, enough_means, result.means)) // 如果已经收敛(converged)了
    return result
  else // 否则递归
    return k_means(points, k, range, result.means, count)
}

/**
 * 以给定的中心点，收敛（converge）一次。
 * @param opts
 * @param means - 给定的中心点
 */
export
function converge(points: I_points_data, means: Points, count: number): Result {
  const map = new Map<Point, Point[]>()
  for (const mean of means)
    map.set(mean, [])

  // 求出每个数据点 距离最近的 mean
  for (const point of points.data) {
    const [nearest_index] = find_min(
      means.map(mean => calc_distance(points.dimension, mean, point))
    )
    // point 于是 属于 mean。在下一步中，同属一个 mean 的 points 共同构成 cluster。
    map.get(means[nearest_index])!.push(point)
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

/** The return type of `k_means()` and `k_means_pp()`. */
export
class Result {
  clusters: readonly Cluster[]
  means: readonly Point[]
  constructor(
    public readonly count: number,
    dimension: number,
    clusters: Point[][],
  ) {
    const means: Point[] = []
    this.clusters = clusters.map(points => {
      const mean = calc_mean(dimension, points)
      means.push(mean)
      return { mean, points }
    })
    this.means = means
  }
}
