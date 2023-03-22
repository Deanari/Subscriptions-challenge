const donationDao = require('../daos/donation.dao')
const errorType = require('../utils/error.msg')

const isToday = (date) => {
  const now = JSON.stringify(new Date())
  const newDate = JSON.stringify(new Date(date))
  return now.split('T')[0] === newDate.split('T')[0]
}

const getLastDonationByIdSubscription = async (idSubscription) => {
  const response = await donationDao.getLastDonationBySubscriptionId(idSubscription)
  if (!response) throw errorType.internalError
  return response[0]
}

const createDonation = async (subscriptionData) => {
  try {
    const lastDonation = await getLastDonationByIdSubscription(subscriptionData.id_subscription)
    if (lastDonation && isToday(lastDonation.date)) return errorType.alreadyDonatedToday

    const responseDonation = await donationDao.createDonation(subscriptionData)

    if (!responseDonation) throw errorType.internalError
    return responseDonation
  } catch (error) {
    throw error
  }
}

module.exports = { createDonation }