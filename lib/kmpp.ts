import type { Range, I_points_data } from './types.ts'
import { calc_range } from './utils.ts'
import { k_means, type Result } from './kmeans.ts'
import { k_means_pp } from './kmeanspp.ts'

/** KMPP class for performing k-means and k-means++ clustering. */
export
class KMPP {
  range: Lazy<Range>

  /** @param {I_points_data} points - The input data points for clustering. */
  constructor(
    public points: I_points_data,
  ) {
    this.range = new Lazy<Range>(() => calc_range(this.points))
  }

  /**
   * Performs k-means clustering on the input data points.
   * @param {number} k - The number of clusters to create.
   * @returns {Result} The clustering result.
   */
  k_means(k: number): Result {
    return k_means(this.points, k, this.range.val)
  }

  /**
   * Performs k-means++ clustering on the input data points.
   * @param {number} k - The number of clusters to create.
   * @returns {Result} The clustering result.
   */
  k_means_pp(k: number): Result {
    return k_means_pp(this.points, k, this.range.val)
  }
}

class Lazy<Value> {
  private value?: Value
  constructor(private make: () => Value) {}
  get val(): Value {
    return this.value ??= this.make()
  }
}
