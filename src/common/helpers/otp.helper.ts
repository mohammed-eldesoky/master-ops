export const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

export const generateOtpExpiryTime = (minutes: number): Date => {
  return new Date(Date.now() + minutes * 60 * 1000); // current time + minutes in milliseconds
};
