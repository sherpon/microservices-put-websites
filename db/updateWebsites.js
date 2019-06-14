
const updateWebsites = (
  firestore, 
  websiteId, 
  name, 
  favicon, 
  domain
) => {
  firestore.collection('websites').doc(websiteId).update({
    name,
    favicon,
    domain,
  });
};

module.exports = updateWebsites;