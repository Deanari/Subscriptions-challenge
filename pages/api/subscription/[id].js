const subscriptionController = require('../../../controllers/subscription.controller')
const errorType = require('../../../utils/error.msg')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log(`[${new Date()}] req GET subscription id: ${req.query.id}`)
      const response = await subscriptionController.getSubscriptionById(req.query.id)
      res.status(200).send(response)
    } catch (error) {
      errorType.errorHandler(error, res)
    }
  }
  if (req.method === 'PATCH') {
    try {
      console.log(`[${new Date()}] req PATCH subscription id: ${req.query.id}, body: ${JSON.stringify(req.body)}`)
      const response = await subscriptionController.updateSubscription(req, res)
      res.status(200).send(response)
    } catch (error) {
      errorType.errorHandler(error, res)
    }
  }

}
