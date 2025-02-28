const dalService = require("./dal.service");
const oracleService = require("./oracale.service");

async function executeTask() {
    console.log("Executing task...");
    try {
        const result = await oracleService.getMarketSentiment();
        console.log('Market Sentiment:', result); // Log the market sentiment
        if (!result) {
            console.error('Failed to fetch market sentiment', result);
            return;
        }
        const cid = await dalService.publishJSONToIpfs({marketSentiment: result});
        await dalService.sendTask(cid, result, 0);
    } catch (error) {
        console.log(error)
    }
}

function start() {
    setTimeout(() => {
        executeTask(); 

        setInterval(() => {
            executeTask(); 
        }, 60 * 60 * 1000); 
    }, 10000); 
}

module.exports = {
    start
}