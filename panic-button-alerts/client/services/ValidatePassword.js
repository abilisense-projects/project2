// passwordUtils.js
 const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;

  const lengthValid = password.length >= 7;
  const numberValid = /\d/.test(password);
  const specialCharValid = /[!@#$%^&*]/.test(password);

  return {
    length: lengthValid,
    number: numberValid,
    specialChar: specialCharValid,
    // match: matchValid,
  };
};
export default validatePassword