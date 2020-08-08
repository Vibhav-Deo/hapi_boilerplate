const SERVER = {
  PORT: 8000,
  HOST: 'localhost',
  APP_NAME: 'BOILERPLATE',
};

var swaggerDefaultResponseMessages = [
  { code: 200, message: 'OK' },
  { code: 400, message: 'Bad Request' },
  { code: 401, message: 'Unauthorized' },
  { code: 404, message: 'Data Not Found' },
];

const STATUS_MSG = {
  ERROR: {
    DEFAULT: {
      statusCode: 400,
      customMessage: 'Error',
      type: 'DEFAULT',
    },
    USER_ALREADY_REGISTERED: {
      statusCode: 409,
      customMessage: 'You are already registered with us',
      type: 'USER_ALREADY_REGISTERED',
    },
    PASSWORD_REQUIRED: {
      statusCode: 400,
      customMessage: 'Password is required',
      type: 'PASSWORD_REQUIRED',
    },
    INVALID_COUNTRY_CODE: {
      statusCode: 400,
      customMessage: 'Invalid Country Code, Should be in the format +52',
      type: 'INVALID_COUNTRY_CODE',
    },
    PHONE_NO_EXIST: {
      statusCode: 400,
      customMessage: 'Mobile No. Already Exist',
      type: 'PHONE_NO_EXIST',
    },
    USERNAME_EXIST: {
      statusCode: 400,
      customMessage: 'Username Already Exist',
      type: 'USERNAME_EXIST',
    },
    INVALID_TOKEN: {
      statusCode: 401,
      customMessage: 'Invalid token provided',
      type: 'INVALID_TOKEN',
    },
    INCORRECT_ACCESSTOKEN: {
      statusCode: 403,
      customMessage: 'Incorrect AccessToken',
      type: 'INCORRECT_ACCESSTOKEN',
    },
    INVALID_CODE: {
      statusCode: 400,
      customMessage: 'Invalid Verification Code',
      type: 'INVALID_CODE',
    },
    USER_NOT_FOUND: {
      statusCode: 400,
      customMessage: 'User Not Found',
      type: 'USER_NOT_FOUND',
    },
    INCORRECT_PASSWORD: {
      statusCode: 400,
      customMessage: 'Incorrect Password',
      type: 'INCORRECT_PASSWORD',
    },
    NOT_REGISTERED: {
      statusCode: 400,
      customMessage:
        'You are not registered with us. Please register yourself to use the services',
      type: 'NOT_REGISTERED',
    },
    NOT_FOUND: {
      statusCode: 400,
      customMessage: 'User Not Found',
      type: 'NOT_FOUND',
    },
    USER_NOT_REGISTERED: {
      statusCode: 401,
      customMessage: 'User is not registered with us',
      type: 'USER_NOT_REGISTERED',
    },
    INVALID_EMAIL_FORMAT: {
      statusCode: 400,
      customMessage: 'Inavlid email format',
      type: 'INVALID_EMAIL_FORMAT',
    },
  },
  SUCCESS: {
    DEFAULT: {
      statusCode: 200,
      customMessage: 'Success',
      type: 'DEFAULT',
    },
    CREATED: {
      statusCode: 201,
      customMessage: 'Created Successfully',
      type: 'CREATED',
    },
    VERIFY_COMPLETE: {
      statusCode: 200,
      customMessage: 'OTP verification is completed.',
      type: 'VERIFY_SENT',
    },
    VERIFY_SENT: {
      statusCode: 200,
      customMessage: 'Your new OTP has been sent to your phone',
      type: 'VERIFY_SENT',
    },
    LOGOUT: {
      statusCode: 200,
      customMessage: 'Logged Out Successfully',
      type: 'LOGOUT',
    },
    PASSWORD_RESET: {
      statusCode: 200,
      customMessage: 'Password Reset Successfully',
      type: 'PASSWORD_RESET',
    },
  },
};

module.exports = {
  SERVER: SERVER,
  STATUS_MSG: STATUS_MSG,
  swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
};
