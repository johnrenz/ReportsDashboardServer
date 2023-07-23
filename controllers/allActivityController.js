
const dbOperation        = require('../db/dbOperation');
const Redis             = require('ioredis');
const useCaching = process.env.REDIS_USE_CACHING === 'true';
let redis
if (useCaching) {
    redis = new Redis({
        'port': process.env.REDIS_PORT,
        'host': process.env.REDIS_HOST
    });
}

const searchAllActivity = async (req, res) => {
        let parameters = {
            SearchBy: req.body.SearchType,
            SearchText: req.body.SearchType ==='Order' 
                ? `${req.body.Orders}`
                :  req.body.SearchType ==='Account' 
                    ? `${req.body.Accounts}` 
                    : req.body.SearchType ==='User' 
                        ? `${req.body.Users}` 
                        : '', 
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Websites: req.body.Websites
        };
        const cacheKey = `AllActivity:SearchBy=${parameters.SearchBy},
        SearchText=${parameters.SearchText},
        StartDate=${parameters.StartDate},
        EndDate=${parameters.EndDate},
        Websites=${parameters.Websites}`;
        if (useCaching) {
            let cacheActivity = await redis.get(cacheKey);
            if (cacheActivity) {
                console.log("got activity from cache");
                cacheActivity = JSON.parse(cacheActivity);
                console.log(cacheActivity);
                res.send({result: cacheActivity});
            }
            else {
                dbOperation.getAllActivity(parameters).then(eResult => {
                    console.log("getAllActivity returned");
                    res.send({result: eResult.recordset});
                    console.log("setting allactivity cache");
                    redis.set(cacheKey, JSON.stringify(eResult.recordset), 'EX', 3600); //1 hour
                });
            }
        }
        else {
            dbOperation.getAllActivity(parameters).then(eResult => {
                console.log("getAllActivity returned");
                res.send({result: eResult.recordset});
            });
        }
    }

module.exports = {
    searchAllActivity
};
