require('dotenv').config();
const axios = require("axios");

var ipfsHost='';

function init() {
  ipfsHost = process.env.IPFS_HOST;
}


async function getIPfsTask(cid) {
    const { data } = await axios.get(ipfsHost + cid);
    return {
        marketSentiment: parseFloat(data.marketSentiment),
    };
  }  
  
module.exports = {
  init,
  getIPfsTask
}