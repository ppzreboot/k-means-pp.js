/** 
 * Represents the range of possible values for each dimension of the points.
 * This is used to define the boundaries of the data space.
 */
export
interface Range {
  /** The minimum values for each dimension */
  min: Point
  /** The maximum values for each dimension */
  max: Point
}

/** Represents a data point in a dataset. */
export
type Point = readonly number[]

/** Represents an element of a dataset. */
export
interface Points_element {
  /** Index of the data point in the dataset */
  index: number
  /** The data point */
  point: Point
}

/** Represents the data of a dataset. */
export
interface I_points_data {
  /** Number of dimensions (1D? 2D? 3D?) */
  dimension: number
  /** Coordinate data */
  data: readonly Point[]
}

/** 
 * Represents a cluster of points with an associated centroid.
 * This structure is used in clustering algorithms to group similar data points.
 */
export
interface Cluster {
  /** The mean of the cluster */
  mean: Point
  /** The points in the cluster */
  points: readonly Points_element[]
}

/** Represents a collection of data points. */
export
type Points = readonly Point[]

/** Represents the type of k-means algorithm to use. */
export
type k_means_type = 'k_means' | 'k_means_pp'
