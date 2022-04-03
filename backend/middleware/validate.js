const _ = require('lodash');
const joi = require('joi');

const { error } = require('../utils/error');

const defaults = {
  abortEarly: false,
  allowUnknown: false,
  convert: true,
};

const validationKey = Symbol('validation');

function validation(path, target, schema, options = {}) {
  const opts = _.defaults(options, defaults);
  const schemaCompiled = joi.compile(schema);

  const validator = async function (ctx, next) {
    const input = _.get(ctx, path);

    const { error: err, value: data } = schemaCompiled.validate(input, opts);

    if (err) throw new error.ValidationError('vinoteka_service.bad_request', err, 400);

    _.update(ctx, `v.${target}`, (prevData) => ({ ...prevData, ...data }));

    await next();
  };
  _.set(validator, [validationKey, target], schema);

  return validator;
}

const validate = {
  body: validation.bind(null, 'request.body', 'body'),
  header: validation.bind(null, 'request.header', 'header'),
  param: validation.bind(null, 'params', 'param'),
  query: validation.bind(null, 'request.query', 'query'),
};


module.exports = { validate };