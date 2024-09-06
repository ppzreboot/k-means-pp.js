# k-means-pp.js
A JS/TS implementation of the k-means algorithm.

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

Calculate k means of a given set of coordinates:

```ts
import { kmeans } from 'k-means-pp'

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

const result1 = kmpp.kmeanspp(k)
console.log(result1.means)

const result2 = kmpp.kmeans(k)
console.log(result2.means)
```
