
# Cache - A simple caching object with TTL

Copyright 2017 Sleepless Software Inc. All rights reserved.


## Install

	npm install cache


## Usage

	Cache = require("cache");

	c = new Cache(10 * 1000);    // Create a cache with 10 second TTL

	key = "foo";
	val = "something";    // any object

	c.put(key, val);      // put it in the cache.
	                      // Optional 3rd arg is TTL for just this
						  // key, e.g.;  c.put(key, val, 5 * 1000);

	c.get(key);           // "something" (less than 10 secs have passed)

	// 11 seconds later ...
	setTimeout(function() {

		c.get(key);       // expired out of cache

	}, 11 * 1000);






