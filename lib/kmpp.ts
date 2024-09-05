import type { Range, I_points_data } from './types.ts'
import { calc_range } from './utils.ts'
import { k_means, type Result } from './kmeans.ts'
import { k_means_pp } from './kmeanspp.ts'

export
class KMPP {
  range: Lazy<Range>
  constructor(
    public points: I_points_data,
  ) {
    this.range = new Lazy<Range>(() => calc_range(this.points))
  }

  kmeans(k: number): Result {
    return k_means(this.points, k, this.range.val)
  }

  kmeanspp(k: number): Result {
    return k_means_pp(this.points, k, this.range.val)
  }
}

class Lazy<Value> {
  private value?: Value
  constructor(private make: () => Value) {}
  get val() {
    return this.value ??= this.make()
  }
}
