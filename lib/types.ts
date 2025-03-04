export
type I_point = number[]

export
type I_quantify = (d: number, a: I_point, b: I_point) => number

/** the boundaries of the data space */
export
interface I_range {
  min: I_point
  max: I_point
}

export
type I_k_means_type = 'k_means' | 'k_means_pp'

export
interface I_cluster {
  /** `index` is more convenient for the association between point and mean */
  indices: number[]
  mean: I_point
}
