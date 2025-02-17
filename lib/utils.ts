import type { I_point, I_range } from './types.ts'

export
function is_same_point(d: number, A: I_point, B: I_point) {
  for (let i=0; i<d; i++)
    if (A[i] !== B[i])
      return false
  return true
}

export
function has_enough_unique_points(d: number, points: I_point[], k: number): [true]
| [false, I_point[]] {
  const unique_list: I_point[] = []
  for (const point of points) {
    if (unique_list.every(unique_point =>
      !is_same_point(d, unique_point, point)
    ))
      unique_list.push(point)

    if (unique_list.length >= k)
      return [true]
  }
  return [false, unique_list]
}

export
function calc_squared_distance(dimension: number, A: I_point, B: I_point) {
  let sum = 0
  for(let i=0; i<dimension; i++)
    sum += (A[i] - B[i]) **2
  return sum
}

// export
// function calc_distance(dimension: number, A: I_point, B: I_point) {
  // return Math.sqrt(calc_squared_distance(dimension, A, B))
// }

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
function calc_mean(dimension: number, cluster: I_point[]): [true, I_point]
| [false, 'too few elements'] {
  if (cluster.length === 0)
    return [false, 'too few elements']

  const mean: number[] = []
  for(let i=0; i<dimension; i++)
    mean[i] = cluster.reduce((sum, point) =>
      sum += point[i]
    , 0) / cluster.length

  return [true, mean]
}

export
function calc_range(d: number, points: I_point[]): I_range {
  const min = new Array(d).fill(Infinity)
  const max = new Array(d).fill(-Infinity)

  for (const point of points)
    for (let i=0; i<d; i++) {
      if (point[i] < min[i])
        min[i] = point[i]
      if (point[i] > max[i])
        max[i] = point[i]
  }

  return { min, max }
}
