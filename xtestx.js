const Cache = require('./index')

const cache = new Cache(100)

cache.put('a', 'A')
cache.put('b', 'B')
cache.put('c', 'C')

console.log(cache.get('a'))
console.log(cache.keys())

setTimeout(() => {
  cache.put('d', 'D')
}, 50)

setTimeout(() => {
  console.log(cache.get('a'))
  console.log(cache.get('d'))
  console.log(cache.keys())
}, 120)

setTimeout(() => {
  cache.gc()
  console.log(cache.data)
}, 200)