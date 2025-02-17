import type { I_cluster, I_point, I_range } from './types.ts'
import { find_min, is_same_point, calc_squared_distance, calc_mean, calc_range } from './utils.ts'

/**
 * @param d dimension of the points
 * @param points data points: Check points with `has_enough_unique_points` before.
 * @param k number of means
 * @param range boundaries of the data space
 * @param means initial means
 * @returns [the k clusters, the count of iterations]
 */
export
function k_means(
  d: number, points: I_point[], k: number,
  range = calc_range(d, points),
  means: I_point[] = [],
): [I_cluster[], number] {
  let count = 0
  while (true) {
    count++

    const old_means = means.slice()
    while (old_means.length < k) // 中心点(means)不够时，补充随机的中心点
      old_means.push(random_mean(range))

    /* 收敛(converge)，求出新的中心点(means) */
    const clusters = converge(d, points, old_means)
    const new_means = clusters.map(cluster => cluster.mean)

    /**
     * 注意这里的 old_means 不能用 means 代替：
     * 很多时候，明明有足够多的点，足够挑出 k 个 means，
     * 但上一步补足的 mean 恰好离所有点都远，
     * 收敛之后，刚补足的 mean 就被舍弃了，
     * 此时并不能说明“不能挑出另一个 mean”
     */
    if (is_converged(d, old_means, new_means)) // 如果已经收敛(converged)了
      return [clusters, count]
    else
      means = new_means
  }
}

/** 接收 old means，计算并返回 new means */
function converge(d: number, points: I_point[], means: I_point[]): I_cluster[] {
  const map = new Map<I_point, number[]>( // mean => index
    means.map(m => [m, []])
  )

  // 求出每个数据点 距离最近的 mean
  for (let i=0; i<points.length; i++) {
    const point = points[i]
    const [shortest] = find_min(
      means.map(mean => calc_squared_distance(d, mean, point))
    )
    // point 于是 属于 mean。在下一步中，同属一个 mean 的 points 共同构成 cluster。
    map.get(means[shortest])!.push(i)
  }

  return Array.from(map.values())
    .map((indices) => {
      if (indices.length === 0)
        return null

      const [ok, mean] = calc_mean(d, indices.map(i => points[i]))
      if (!ok) throw Error('Unkown Error')

      return { indices, mean }
    })
    .filter(cluster => cluster !== null)
}

function random_mean(range: I_range): I_point {
  const point: number[] = []
  for (let i=0; i<range.min.length; i++) {
    const span = range.max[i] - range.min[i]
    point[i] = Math.random() * span + range.min[i]
  }
  return point
}

function is_converged(d: number, means_a: I_point[], means_b: I_point[]) {
  const length = means_a.length
  if (length !== means_b.length)
    return false

  for (let i=0; i<length; i++)
    if (!is_same_point(d, means_a[i], means_b[i]))
      return false

  return true
}
