import type { Point, I_points_data, Range } from './types.ts'
import { find_min, calc_distance, find_max } from './utils.ts'
import { k_means } from './kmeans.ts'

/** 输入若干点，输出 k 个中心点。 */
export
function k_means_pp(points: I_points_data, k: number, range: Range): readonly Point[] {
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
  /* 1. 各 point 距自己中心点的距离 */
  const point_distance = points.data.map(point => {
    /* 1. 当前 point 距各 mean 的距离 */
    const distances = pp_means.map(mean => calc_distance(points.dimension, mean, point))
    /* 2. 当前 point 的中心点 */
    const mean = pp_means[
      find_min(distances)[0]
    ]
    /* 3. 当前 point 距自己中心点的距离 */
    return calc_distance(points.dimension, mean, point)
  })

  /* 2. 距自己中心点最远的 point */
  return points.data[
    find_max(point_distance)[0]
  ]
}
