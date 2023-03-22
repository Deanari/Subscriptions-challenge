const db = require('../config/db')

const createDonation  = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    db.query(`
      INSERT INTO donation (id_user, amount, id_payment_method, id_subscription, result) 
      VALUES (
        ${subscriptionData.id_user},
        ${subscriptionData.amount}, 
        ${subscriptionData.id_payment_method}, 
        ${subscriptionData.id_subscription}, 
        'PENDING');`, (error, data) => {
          if (error) reject(error)
          resolve(data)
        });
  })
};

const getLastDonationBySubscriptionId = (idSubscription) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM main.donation WHERE id_subscription = ${idSubscription} AND result != 'REJECTED' ORDER BY date DESC LIMIT 1; `, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}
module.exports = {
  createDonation,
  getLastDonationBySubscriptionId
};
