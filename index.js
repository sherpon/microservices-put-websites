// Get Development Env
require('./utilities/getEnv')();

const getToken = require('./utilities/getToken');
const getFirestore = require('./db/getFirestore');
const updateWebsites = require('./db/updateWebsites');
const getAuthorization = require('./services/getAuthorization');
const domainManager = require('./services/domainManager');

let firestore;

const updateWebsitesDomainStep = async (req, res) => {
  try {
    const websiteId = req.query.websiteId;
    const newDomain = req.body.newDomain;
    const oldDomain = req.body.oldDomain;
    const response = await domainManager(websiteId, newDomain, oldDomain);
    if (response.status===204) {
      // no content
      res.status(204);
      res.end();  // send no content  
    } else {
      // bad request
      console.log('the domainManager failed');
      res.status(401);
      res.end();  // send no content
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    res.end();  // send no content
  }
};

const updateWebsitesStep = async (req, res) => {
  try {
    const websiteId = req.query.websiteId;
    const name = req.body.name;
    const favicon = req.body.favicon;
    const newDomain = req.body.newDomain;
    const oldDomain = req.body.oldDomain;
    firestore = getFirestore(firestore);
    await updateWebsites(firestore, websiteId, name, favicon, newDomain);
    if (newDomain!==oldDomain) {
      await updateWebsitesDomainStep(req, res);
    } else {
      res.status(204);
      res.end();  // send no content  
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    res.end();  // send no content
  }
};

const getAuthorizationStep = async (req, res) => {
  try {
    const userId = req.query.userId;
    const websiteId = req.query.websiteId;
    const token = req.userToken;
    const response = await getAuthorization(token, userId, websiteId);
    if (response.status===202) {
      // authorized
      await updateWebsitesStep(req, res);
    } else {
      // unauthorized
      console.log('the user ' + userId + ' is unauthorized');
      res.status(401);
      res.end();  // send no content
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    res.end();  // send no content
  }
};

const getTokenStep = async (req, res) => {
  const myAuthentication = getToken(req.headers);
  if (myAuthentication===false) {
    // didn't find any token
    res.status(401);
    res.end();  // send no content
  } else {
    // populate it
    req.userToken = myAuthentication.token;
    await getAuthorizationStep(req, res);
    // saveAttributesStep(req, res); /** IMPORTANT */
  }
};

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.putWebsites = async (req, res) => {
  // const token = req.userToken;
  // const userId = req.query.userId;
  // const websiteId = req.query.websiteId;
  // const type = req.body.type;
  // const filename = req.body.filename;

  // Set CORS headers for preflight requests
  res.set('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'PUT');
    res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204)
    res.end();
  } else {
    await getTokenStep(req, res);
  }
};