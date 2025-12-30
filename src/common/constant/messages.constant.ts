const generateMessage = (data) => ({
  notFound: `${data} not found`,
  alreadyExists: `${data} already exists`,
  invalid: `Invalid ${data}`,
  required: `${data} is required`,
  created: `${data} created successfully`,
  updated: `${data} updated successfully`,
  deleted: `${data} deleted successfully`,
  failed: `${data} failed`,
});

export const messages = {
user :{...generateMessage('User')},
department :{...generateMessage('Department')},
token :{...generateMessage('Token')},
product:{...generateMessage('Product')},

}