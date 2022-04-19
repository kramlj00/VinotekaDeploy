const ERROR_CONSTANTS = {
  vinoteka_service: {
    bad_request: 400,
    user_already_exists: 400,
    forbidden: 403,
    order_not_found: 404,
  },
  internal_vinoteka_service_error: 500,
  user: {
    not_found: 404,
    invalid_token: 401,
    no_token: 401,
  },
};

module.exports = { ERROR_CONSTANTS };
