const axios = require('axios');

const domainManager = (websiteId, newDomain, oldDomain) => {
  return axios({
    method: 'post',
    baseURL: process.env.DOMAIN_MANAGER_ENDPOINT,
    headers: {},
    data: {
      websiteId: websiteId,
      newDomain: newDomain,
      oldDomain: oldDomain,
    }
  });
};

module.exports = domainManager;