const subscriptionService = require('../services/subscription.service')
const errorType = require('../utils/error.msg')

const getSubscriptionById = async (idSubscription) => {
  try {
    return await subscriptionService.getSubscriptionById(idSubscription)
  } catch (error) {
    throw error
  }
}

const getAllSubscritions = async () => {
  try {
    return await subscriptionService.getAllSubscritions()
  } catch (error) {
    throw error
  }
}

const updateSubscription = async (req, res) => {
  if (!req.query.id || !req.body) throw errorType.missingParameters
  try {
    return await subscriptionService.updateSubscription(req.query.id, req.body)
  } catch (error) {
    throw error
  }
}

module.exports = { getSubscriptionById, getAllSubscritions, updateSubscription }