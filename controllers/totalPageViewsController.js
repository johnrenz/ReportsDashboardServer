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

const searchTotalPageViews = async (req, res) => {
    console.log(req.body.SearchType);
    console.log(req.body.Orders);
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
        const cacheKey = `TotalPageView:SearchBy=${parameters.SearchBy},
        SearchText=${parameters.SearchText},
        StartDate=${parameters.StartDate},
        EndDate=${parameters.EndDate},
        Websites=${parameters.Websites}`;
        if (useCaching) {
            let cacheActivity = await redis.get(cacheKey);
            if (cacheActivity) {
                cacheActivity = JSON.parse(cacheActivity);
                res.send({result: cacheActivity});
            }
            else {
                dbOperation.getTotalPageViews(parameters).then(eResult => {
                    res.send({result: eResult.recordset[0]});
                    redis.set(cacheKey, JSON.stringify(eResult.recordset[0]), 'EX', 3600); //1 hour
                });
            }
        }
        else {
            dbOperation.getTotalPageViews(parameters).then(eResult => {
                res.send({result: eResult.recordset[0]});
            });
        }
    }

module.exports = {
    searchTotalPageViews
};