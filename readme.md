# k-means-pp.js
A JS/TS implementation of the k-means and k-means++ clustering algorithm.

+ Implements both k-means and k-means++ algorithms
+ Supports multi-dimensional data points
+ Works in any JavaScript environment, including browsers, Node.js, Deno and more

## Installation
##### deno
``` bash
deno add @ppz/k-means-pp
```

##### npm
```bash
npm install k-means-pp
```

## Usage
```ts
import { KMPP } from 'k-means-pp'

const kmpp = new KMPP({
  dimension: 3,
  data: [
    [1,2,3],
    [0, 270, 103],
    [3,4,5],
    [0,0,0],
    [100, 200, 1],
    [0, 310, 120],
    [10, 320, 90],
    [100, 201, 3],
    [0, 300, 100],
    [1000, 2000, 1],
  ],
})

const result1 = kmpp.k_means_pp(k)
console.log(result1.means)

const result2 = kmpp.k_means(k)
console.log(result2.means)
```
