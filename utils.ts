import type { Point } from './types'

/** Calc the distance between A and B */
export
function distance(dimension: number, A: Point, B: Point) {
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
function calc_mean(dimension: number, points: Point[]) {
  if (points.length === 0) throw Error('too few elements')

  let mean = []
  for(let i=0; i<dimension; i++)
    mean[i] = points.reduce((sum, point) =>
      sum += point[i]
    , 0) / points.length
  return mean
}
