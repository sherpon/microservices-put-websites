
const updateUser = (
    firestore, 
    userId, 
    name,
    email, 
    phone
) => {
  firestore.collection('users').doc(userId).update({
    name,
    email,
    phone,
  });
};

module.exports = updateUser;