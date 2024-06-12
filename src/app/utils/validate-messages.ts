const typeTemplate = "${label} is not valid";

export const validateMessages = {
  default: "${label} is not valid",
  required: "Please enter ${label}",
  enum: "${label} must be one of ${enum}",
  whitespace: "${label} cannot be empty",
  date: {
    format: "Invalid date format",
    parse: "${label} cannot be parsed as a date",
    invalid: "${label} is not a valid date",
  },
  types: {
    email: typeTemplate,
    number: typeTemplate,
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "Length of ${label} is not valid",
    min: "${label} must be at least ${min} characters long",
    max: "${label} must be at most ${max} characters long",
    range: "${label} must be between ${min}-${max} characters long",
  },
  number: {
    len: "${label} must have ${len} digits",
    min: "${label} must be at least ${min}",
    max: "${label} must be at most ${max}",
    range: "${label} must be between ${min} and ${max}",
  },
  array: {
    len: "There must be ${len} ${label}",
    min: "There must be at least ${min} ${label}",
    max: "There can be at most ${max} ${label}",
    range: "Number of ${label} must be between ${min} and ${max}",
  },
  pattern: {
    mismatch: "${label} is not valid",
  },
};
