import type { Point, I_opts, Range } from './types.ts'

/** Calc the distance between A and B */
export
function calc_distance(dimension: number, A: Point, B: Point) {
  let sum = 0
  for(let i=0; i<dimension; i++)
    sum += (A[i] - B[i]) **2
  return Math.sqrt(sum)
}

export
function find_min(nums: number[]) {
  if (nums.length < 1)
    throw Error('too few nums')

  let min = [0, nums[0]] // first num

  for(let i=1; i<nums.length; i++)
    if (nums[i] < min[1])
      min = [i, nums[i]]

  return min
}

export
function find_max(nums: number[]) {
  if (nums.length < 1)
    throw Error('too few nums')

  let max = [0, nums[0]] // first num

  for(let i=1; i<nums.length; i++)
    if (nums[i] > max[1])
      max = [i, nums[i]]

  return max
}

export
function calc_mean(dimension: number, points: Point[]): Point {
  if (points.length === 0) throw Error('too few elements')

  const mean: Point = []
  for(let i=0; i<dimension; i++)
    mean[i] = points.reduce((sum, point) =>
      sum += point[i]
    , 0) / points.length
  return mean
}

export
function calc_range(opts: I_opts): Range {
  const min = new Array(opts.dimension).fill(Infinity)
  const max = new Array(opts.dimension).fill(-Infinity)

  for (const point of opts.points)
    for (let i=0; i<opts.dimension; i++) {
      if (point[i] < min[i])
        min[i] = point[i]
      if (point[i] > max[i])
        max[i] = point[i]
  }

  console.debug('calculated range', { min, max })
  return { min, max }
}
