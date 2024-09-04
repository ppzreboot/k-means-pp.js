export
type Point = number[]

export
interface I_opts {
  /** 点的维度数（1 维？2 维？3 维？） */
  dimension: number
  /** 中心点个数 */
  k: number
  /** 待求中心点的散点 */
  points: readonly Point[]
  /** 最大收敛次数 */
  max_convergence?: number
}

export
interface Range {
  min: number[]
  max: number[]
}
