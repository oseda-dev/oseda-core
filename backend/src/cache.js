const NodeCache = require("node-cache");

/*
Express middleware for caching GET requests
Too much data comes from filepath lookups
This will scale very poorly without a cache
*/

// testing with five minutes for now
// will swap in inf (until restart aka deploy)
// server does not support non get requests anyway
const cache = new NodeCache({ stdTTL: 60 * 5 });

const GETcache = () => (req, res, next) => {

    console.log("using get cache")

    // aside from FS, server should be stateless, 
    // so only cache get requests
    if (req.method !== 'GET') {

        console.log("not a get request")
        return next();
    }

    
    const key = req.originalUrl;

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
        cache.set(key, body); 
        res.sendResponse(body);
    };

    next();
};

module.exports = {
    getCacher: GETcache
}