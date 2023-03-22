const subscriptionController = require('../../../controllers/subscription.controller')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await subscriptionController.getAllSubscritions(req, res)
      res.status(200).send(response)
    } catch (error) {
      errorType.errorHandler(error, res)
    }
  }
}
