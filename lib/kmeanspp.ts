import type { Point, I_opts } from './types.ts'
import { find_min, calc_distance, find_max } from './utils.ts'
import { k_means } from './kmeans.ts'

/** 输入若干点，输出 k 个中心点。 */
export
function k_means_pp(opts: I_opts): readonly Point[] {
  /* 1. 随机一个中心点 */
  const first_mean = opts.points[
    Math.floor(opts.points.length * Math.random())
  ]

  /* 2. k-means++ 最初的 means */
  const pp_means = [first_mean]
  while(pp_means.length < opts.k)
    pp_means.push(new_pp_mean(opts, pp_means))

  return k_means(opts, pp_means)
}

function new_pp_mean(opts: I_opts, pp_means: Point[]): Point {
  /* 1. 各 point 距自己中心点的距离 */
  const point_distance = opts.points.map(point => {
    /* 1. 当前 point 距各 mean 的距离 */
    const distances = pp_means.map(mean => calc_distance(opts.dimension, mean, point))
    /* 2. 当前 point 的中心点 */
    const mean = pp_means[
      find_min(distances)[0]
    ]
    /* 3. 当前 point 距自己中心点的距离 */
    return calc_distance(opts.dimension, mean, point)
  })

  /* 2. 距自己中心点最远的 point */
  return opts.points[
    find_max(point_distance)[0]
  ]
}
