
// Copyright 2017 Sleepless Software Inc. All rights reserved.

function Cache(ttl) {

	var me = this;
	var head = null;
	var tail = null;

	me.now = function() { return (new Date()).getTime() }
	me.ttl = ttl || 0;
	me.data = {}

	me.gc = function() {
		if (head && me.now() >= head.expires) {
			delete me.data[head.key];
			head = head.next;
			me.gc();
		}
	}

	me.keys = function() {
		var keys = []
		var obj = head
		while (obj) {
			keys.push(obj.key)
			obj = obj.next
		}
		return keys
	}

	me.get = function(key) {
		me.gc()
		var val = null
		var obj = me.data[key]
		if(obj) {
			val = obj.val
			if(me.now() >= obj.expires) {
				val = null
				delete me.data[key]
			}
		}
		return val
	}

	me.del = function(key) {
		me.gc()
		var oldEntry = me.data[key];
		if (oldEntry) {
			if (oldEntry.prev) oldEntry.prev.next = oldEntry.next
			if (oldEntry.next) oldEntry.next.prev = oldEntry.prev
			delete me.data[key]
			return oldEntry.val
		}
	}

	me.put = function(key, val, ttl) {
		me.gc()
		if(ttl === undefined) {
			ttl = me.ttl;
		}
		var oldval = me.del(key); 
		if(val !== null) {
			var next = { key: key, expires: me.now() + ttl, val: val, prev: tail }
			if (tail) tail = tail.next = next
			else head = tail = next
			me.data[ key ] = next
		}
		return oldval
	}

}

module.exports = Cache;

