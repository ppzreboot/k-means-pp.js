import type { Range, I_points_data, Points } from './types.ts'
import { calc_range, unique_points } from './utils.ts'
import { k_means, type Result } from './kmeans.ts'
import { k_means_pp } from './kmeanspp.ts'
import type { k_means_type } from './types.ts'

/** KMPP class for performing k-means and k-means++ clustering. */
export
class KMPP {
  range: Lazy<Range>

  /** @param points - The input data points for clustering. */
  constructor(
    public points: I_points_data,
  ) {
    this.range = new Lazy<Range>(() => calc_range(this.points))
  }

  /**
   * Performs k-means/k-means++ clustering on the input data points.
   * @param k - The number of clusters to create.
   * @param type - The type of k-means algorithm to use. Default is `k_means_pp`.
   * @returns The clustering result, or Points if the number of unique points is less than k.
   */
  cluster(k: number, type: k_means_type = 'k_means_pp'): Result | Points {
    const unique = unique_points(this.points)
    if (unique.set.size < k)
      return Array.from(unique.map.values())

    const execute = type === 'k_means_pp' ? k_means_pp : k_means
    return execute(this.points, k, this.range.val)
  }
}

class Lazy<Value> {
  private value?: Value
  constructor(private make: () => Value) {}
  get val(): Value {
    return this.value ??= this.make()
  }
}
