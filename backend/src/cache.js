const NodeCache = require("node-cache");
const path = require("path");


// cache for 10 minutes
const CACHE_DURATION_SECONDS = 60 * 10;

// cleanup expired keys every 60 seconds
const CLEANUP_PERIOD_SECONDS = 60;
/*
Express middleware for caching GET requests
Too much data comes from filepath lookups
This will scale very poorly without a cache
*/

// testing with five minutes for now
// server does not support non get requests anyway
const cache = new NodeCache({ 
    stdTTL: CACHE_DURATION_SECONDS,
    checkperiod: CLEANUP_PERIOD_SECONDS
});


// do not cache assets with these extensions
const EXT_BLACKLIST = ['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.zip'];

const GETcache = () => (req, res, next) => {

    // aside from FS, server should be stateless, 
    // so only cache get requests
    if (req.method !== 'GET') {

        return next();
    }

    const key = req.originalUrl;

    // skip caching if blocked ext.
    const ext = path.extname(req.path).toLowerCase();
    if (EXT_BLACKLIST.includes(ext)) {
        console.log(`skipped blacklisted ext ${req.path}`)
        return next();
    }

    

    // get value from cache
    const cachedBody = cache.get(key);

    // cache hit, send cached result
    if (cachedBody) {
        console.log(`cache hit for ${key}`);
        res.send(cachedBody);
        return;
    }

    console.log(`cache miss for ${key}`);

    res.sendResponse = res.send;
    res.send = (body) => {
        // store the response in cache, then send uncached body

        // nodecache allows you to pass a duration the overrides
        // the stdTTL. Might consider doing this for specific authors, eg. ReeseHatfield
        cache.set(key, body); 
        res.sendResponse(body);
    };

    next();
};

module.exports = {
    getCacher: GETcache
}