const generateMessage = (data) => ({
  notFound: `${data} not found`,
  alreadyExists: `${data} already exists`,
  invalid: `Invalid ${data}`,
  required: `${data} is required`,
  created: `${data} created successfully`,
  updated: `${data} updated successfully`,
  login: `${data} logged in successfully`,
  deleted: `${data} deleted successfully`,
  otpSent: `${data} sent successfully`,
  verifyed: `${data} verified successfully`,
  refresh: `${data} refreshed successfully`,
  fetched: `${data} fetched successfully`,
  failed: `${data} failed`,
});

export const messages = {
user :{...generateMessage('User')},
department :{...generateMessage('Department')},
token :{...generateMessage('Token')},
product:{...generateMessage('Product')},
otp:{...generateMessage('OTP')},
passWord:{...generateMessage('Password')},
category:{...generateMessage('Category')},


}