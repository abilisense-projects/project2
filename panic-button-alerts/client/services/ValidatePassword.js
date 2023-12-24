// passwordUtils.js
 const validatePassword = (password, confirmPassword) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;

  const lengthValid = password.length >= 8;
  const numberValid = /\d/.test(password);
  const specialCharValid = /[!@#$%^&*]/.test(password);
  const matchValid = password === confirmPassword;

  return {
    length: lengthValid,
    number: numberValid,
    specialChar: specialCharValid,
    match: matchValid,
  };
};
export default validatePassword