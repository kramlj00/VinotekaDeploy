const _ = require("lodash");
const NestedError = require("nested-error-stacks");

const { ERROR_CONSTANTS } = require("../constants/error");

const getStatus = (ec) => {
  const status = _.get(ERROR_CONSTANTS, ec);
  if (status) {
    return status;
  }
  throw new TypeError(`Error constant not recognized! ${ec}`);
};

class GenericError extends NestedError {
    status;

    error;

  constructor(ec, cause, status) {
    super(ec, cause);
    const errorConstantStatus = getStatus(ec);
    this.error = ec;
    this.status = status || errorConstantStatus;
  }
}

class ValidationError extends GenericError {}
function error(ec, cause, status) {
  const finalStatus = status || getStatus(ec);

  if (ec.startsWith("vinoteka_service.")) {
    return new GenericError(ec, cause, finalStatus);
  }
  return new GenericError(
    "internal_vinoteka_service_error",
    cause,
    finalStatus
  );
}

error.ValidationError = ValidationError;

module.exports = { error };
