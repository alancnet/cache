const Cache = require('../index')
const { expect } = require('chai')

describe('Cache', () => {
  beforeEach(function() {
    this.cache = new Cache(1000)
    this.timestamp = 0
    this.cache.now = () => this.timestamp
    this.increment = x => this.timestamp += x
  })

  describe('get', () => {

    it('should retrieve values it stores', function() {
      this.cache.put('mykey', 1234)
      expect(this.cache.get('mykey')).to.equal(1234)
    })

    it('should return null for values that have not been stored', function() {
      expect(this.cache.get('unknownKey')).to.be.null
    })

    it('should return null for values that have expired', function() {
      this.cache.put('mykey', 1234)
      expect(this.cache.get('mykey')).to.equal(1234)
      this.increment(2000)
      expect(this.cache.get('mykey')).to.be.null
    })
  })

  describe('put', () => {
    it('should override values previously set', function() {
      this.cache.put('key-a', 'a')
      this.cache.put('key-b', 'b')
      this.cache.put('key-c', 'c')
      expect(this.cache.get('key-b')).to.equal('b')
      this.cache.put('key-b', 'b-2')
      expect(this.cache.get('key-b')).to.equal('b-2')
    })

    it('should reset the expiration for new values', function() {
      this.cache.put('key-a', 1234)
      this.cache.put('key-b', 1234)
      this.increment(750)
      this.cache.put('key-a', 5678)
      this.increment(750)
      expect(this.cache.get('key-a')).to.equal(1234)
      expect(this.cache.get('key-b')).to.be.null
    })
  })
  
})