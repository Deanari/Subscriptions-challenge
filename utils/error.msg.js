const missingParameters = {
  status: 400,
  error: 'missing_parameters',
  errorMsg: 'Some parameters are missing, please check your request',
};

const entityExists = {
  status: 409,
  error: 'entity_exists',
  errorMsg: 'The entity could not be created, it was already created',
};

const entityNotFound = {
  status: 404,
  error: 'not_found',
  errorMsg: 'Could not find specified resource',
}

const unavailable = {
  status: 409,
  error: 'unavailable',
  errorMsg: 'Cannot be updated, processing previous update',
}

const alreadyDonatedToday = {
  status: 409,
  error: 'already_donated_today',
  errorMsg: 'Donation skipped, already donated today',
}

const internalError = {
  status: 500,
  error: 'internal_error',
  errorMsg: 'UPS, something went wrong...',
};

const errorHandler = (error, res) => {
  console.log('error handler', error)
  if (error === undefined) return res.status(500).send(error);
  const { status } = error;
  if (status === undefined) return res.status(500).send(error);
  return res.status(status).send(error);
};

module.exports = {
  missingParameters,
  entityExists,
  entityNotFound,
  unavailable,
  alreadyDonatedToday,
  internalError,
  errorHandler,
};