import type { I_points_data, Point, Points } from './types.ts'

export
function unique_points(points: I_points_data) {
  const map = new Map<string, Point>()
  const set = new Set(points.data.map(point => {
    const str = point.toString()
    map.set(str, point)
    return str
  }))
  return { map, set }
}

export
function calc_squared_distance(dimension: number, A: Point, B: Point) {
  let sum = 0
  for(let i=0; i<dimension; i++)
    sum += (A[i] - B[i]) **2
  return sum
}

export
function calc_distance(dimension: number, A: Point, B: Point) {
  return Math.sqrt(calc_squared_distance(dimension, A, B))
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
function calc_mean(dimension: number, cluster: Points): Point {
  if (cluster.length === 0) throw Error('too few elements')

  const mean: number[] = [] // Point: readonly number[]
  for(let i=0; i<dimension; i++)
    mean[i] = cluster.reduce((sum, point) =>
      sum += point[i]
    , 0) / cluster.length

  return mean
}

export
function calc_range(points: I_points_data) {
  const min = new Array(points.dimension).fill(Infinity)
  const max = new Array(points.dimension).fill(-Infinity)

  for (const point of points.data)
    for (let i=0; i<points.dimension; i++) {
      if (point[i] < min[i])
        min[i] = point[i]
      if (point[i] > max[i])
        max[i] = point[i]
  }

  return { min, max }
}
