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
// import { KMPP } from '@ppz/k-means-pp' // install from deno
import { k_means_pp, k_means } from 'k-means-pp' // install from npm

const dimension = 3
const points = [
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
]

const range = calc_range(dimension, points)

const [clusters, count] = k_means_pp(dimension, points, 8, range)
console.log(clusters.map(c => c.mean), count)

const [clusters_pp, count_pp] = k_means(dimension, points, 8, range)
console.log(clusters_pp.map(c => c.mean), count_pp)
```

## API
+ [k_means](https://jsr.io/@ppz/k-means-pp/doc/~/k_means)
+ [k_means_pp](https://jsr.io/@ppz/k-means-pp/doc/~/k_means_pp)
+ [types](https://jsr.io/@ppz/k-means-pp/doc)

## DEV

##### test
``` bash
deno test
```

##### build for npm
``` bash
deno task npm
cd npm
npm publish --access public
```
