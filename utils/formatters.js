const parseToArray = (value, returnAsNumberArray) => {
  if (returnAsNumberArray && /^\s*,?\d+(\s*,\s*\d+)*\s*,?\s*$/.test(value))
    return value.split(",");
  if (value) return value.split(",");
  return [];
};

module.exports = { parseToArray };
