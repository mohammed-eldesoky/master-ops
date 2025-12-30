export default () => ({
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  cloud: {},
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
