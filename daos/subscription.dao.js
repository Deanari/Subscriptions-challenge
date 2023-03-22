const db = require('../config/db')

const getAllSubscritpions  = () => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT S.id_subscription, S.amount, S.interval, S.id_user, S.id_payment_method, P.type AS payment_type, RIGHT(P.number, 4) AS payment_numbers, S.next_charge_date, S.total_donated, S.is_reserved 
        FROM subscription as S
        JOIN payment_method as P ON P.id_payment_method = S.id_payment_method`,
        (error, data)=>{
          if(error) reject(error)
          resolve(data)
        }
    )
  })
}

const getSubscriptionById = (idSubscription) => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT S.id_subscription, S.amount, S.interval, S.id_user, S.id_payment_method, P.type AS payment_type, RIGHT(P.number, 4) AS payment_numbers, S.next_charge_date, S.total_donated, S.is_reserved 
        FROM subscription as S
        JOIN payment_method as P ON P.id_payment_method = S.id_payment_method
        WHERE id_subscription =  ${idSubscription};`, 
      (error, data)=>{
        if(error) reject(error)
        resolve(data)
      }
    )
  })
}

const updateSubscription = (idSubscription, params) => {
  return new Promise((resolve, reject) => {
    if (params.amount) db.query(`UPDATE subscription SET amount = '${params.amount}' WHERE id_subscription = ${idSubscription};`, (error, data)=>{
      if(error) reject(error)
      resolve(data)
    })
    if (params.interval) db.query(`UPDATE subscription SET \`interval\` = '${params.interval}' WHERE id_subscription = ${idSubscription};`, (error, data)=>{
      if(error) reject(error)
      resolve(data)
    })
    if (params.next_charge_date) db.query(`UPDATE subscription SET next_charge_date = '${params.next_charge_date}' WHERE id_subscription = ${idSubscription};`, (error, data)=>{
      if(error) reject(error)
      resolve(data)
    })
    if (params.total_donated) db.query(`UPDATE subscription SET total_donated = '${params.total_donated}' WHERE id_subscription = ${idSubscription};`, (error, data)=>{
      if(error) reject(error)
      resolve(data)
    })
  })
}

const reserveSubscription = (idSubscription) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE subscription SET is_reserved = 1 WHERE (id_subscription = ${idSubscription})`, (error, data)=>{
      if(error) reject(error)
      resolve(data)
    })
  })
}

const freeSubscription = (idSubscription) => {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE subscription SET is_reserved = 0 WHERE (id_subscription = ${idSubscription})`, (error, data)=>{
      if(error) reject(error)
      resolve(data)
    })
  })
}

module.exports = {
  getAllSubscritpions,
  getSubscriptionById,
  updateSubscription,
  reserveSubscription,
  freeSubscription
};