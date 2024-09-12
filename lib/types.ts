/* 这里仅用于定义“仅在编译时有效”的类型 */

export
interface Range {
  min: Point
  max: Point
}

export
type Point = readonly number[]

export
interface Points_element {
  /** 数据在数据集中的位置 */
  index: number
  /** 数据点 */
  point: Point
}

export
interface I_points_data {
  /** 维度数（1 维？2 维？3 维？） */
  dimension: number
  /** 坐标数据 */
  data: readonly Point[]
}

export
interface Cluster {
  mean: Point
  points: readonly Points_element[]
}

export
type Points = readonly Point[]
