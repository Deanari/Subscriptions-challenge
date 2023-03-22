const subscriptionDao = require('../daos/subscription.dao')
const donationService = require('../services/donation.service')
const errorType = require('../utils/error.msg')

const getAllSubscritions = async () => {
  return await subscriptionDao.getAllSubscritpions()
}

const getSubscriptionById = async (idSubscription) => {
  try {
    const response = await subscriptionDao.getSubscriptionById(idSubscription)
    return response[0]
  } catch (error) {
    throw error
  }
}

// This two could be one but I keep thinking about it
const reserveSubscription = async (idSubscription) => {
  try {
    const response = await subscriptionDao.reserveSubscription(idSubscription)
    return response
  } catch (error) {
    throw error
  }
}

const freeSubscription = async (idSubscription) => {
  try {
    return await subscriptionDao.freeSubscription(idSubscription)
  } catch (error) {
    throw error
  }
}
// ----

const isToday = (date) => {
  const now = JSON.stringify(new Date())
  const newDate = JSON.stringify(new Date(date))
  return now.split('T')[0] === newDate.split('T')[0]
}

const calculateNextChargeDate = (subscriptionData) => {
  let milisecondsToday = new Date().getTime()
  let toAdd = 0
  switch (subscriptionData.interval) {
    case 'monthly':
      toAdd = 2629800000
      break;
    case 'quarterly':
      toAdd = 7889400000
      break;
    case 'annualy': 
      toAdd = 31557600000
      break;
  }
  let result = new Date(milisecondsToday + toAdd).toISOString()
  return result.split('T')[0]
}

const updateSubscription = async (idSubscription, params) => {
  try {
    const subscriptionData = await getSubscriptionById(idSubscription)

    if (!subscriptionData) throw errorType.entityNotFound
    if (subscriptionData.is_reserved) throw errorType.unavailable

    const responseUpdate = await subscriptionDao.updateSubscription(idSubscription, params)
    if (!responseUpdate) throw errorType.internalError

    if (params.next_charge_date && isToday(params.next_charge_date)) {
      await reserveSubscription(subscriptionData.id_subscription)

      const responseDonation = await donationService.createDonation(subscriptionData)
      if (responseDonation) {
        const nextChargeDate = calculateNextChargeDate(subscriptionData)
        await subscriptionDao.updateSubscription(idSubscription, {next_charge_date: nextChargeDate, total_donated: subscriptionData.total_donated + subscriptionData.amount})
      }

      await freeSubscription(subscriptionData.id_subscription)

      if (!responseDonation) throw errorType.internalError
      if (responseDonation === errorType.alreadyDonatedToday) throw errorType.alreadyDonatedToday
      return responseDonation
    } else {
      return responseUpdate
    }
  } catch (error) {
    throw error
  }
}

module.exports = { getAllSubscritions, getSubscriptionById, updateSubscription, reserveSubscription, freeSubscription }