import type { Point, I_opts, Range } from './types.ts'
import { find_min, calc_distance, calc_mean } from './utils.ts'
import { calc_range } from './utils.ts'

export
function k_means(opts: I_opts, means: Point[] = [], range: Range = calc_range(opts)): readonly Point[] {
  /* 中心点(means)不够时，补充随机的中心点 */
  while(means.length < opts.k)
    means.push(random_mean(range))

  /* 收敛(converge)，求出新的中心点(means) */
  const new_means = converge(opts, means)

  if (is_converged(opts.dimension, means, new_means)) // 如果已经收敛(converged)了
    return new_means
  else // 否则递归
    return k_means(opts, new_means, range)
}

/**
 * 以给定的中心点，收敛（converge）一次。
 * @param opts
 * @param means - 给定的中心点
 * @returns 收敛后的新中心点
 */
export
function converge(opts: I_opts, means: Point[]): Point[] {
  const map = new Map<Point, Point[]>()
  for (const mean of means)
    map.set(mean, [])

  // 求出每个数据点 距离最近的 mean
  for (const point of opts.points) {
    const [nearest_index] = find_min(
      means.map(mean => calc_distance(opts.dimension, mean, point))
    )
    // point 于是 属于 mean。在下一步中，同属一个 mean 的 points 共同构成 cluster。
    map.get(means[nearest_index])!.push(point)
  }

  // 对各 cluster 计算其 mean
  return Array.from(map.values())
    .map(cluster =>
      cluster.length && calc_mean(opts.dimension, cluster)
    )
    .filter(mean => mean !== 0)
}

function random_mean(range: Range): Point {
  const point: Point = []
  for (let i=0; i<range.min.length; i++) {
    const span = range.max[i] - range.min[i]
    point[i] = Math.random() * span + range.min[i]
  }
  return point
}

function is_converged(dimension: number, means_a: Point[], means_b: Point[]) {
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
