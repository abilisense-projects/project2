
// import * as Yup from 'yup';
// export const loginValidation = Yup.object().shape({
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .matches(
//       /^(?=.*[0-9])(?=.*[a-zA-Z])/,
//       'Password must include at least one letter and one number'
//     )
//     .required('Password is required'),
// });
// // passwordUtils.js
// const validatePassword = (password, confirmPassword) => {
//   const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;

//   const lengthValid = password.length >= 8;
//   const numberValid = /\d/.test(password);
//   const specialCharValid = /[!@#$%^&*]/.test(password);
//   const matchValid = password === confirmPassword;

//   return {
//     length: lengthValid,
//     number: numberValid,
//     specialChar: specialCharValid,
//     match: matchValid,
//   };
// };
// export default validatePassword


// const ValidateEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };
// export default ValidateEmail


import * as Yup from 'yup';
import validatePassword from './services/ValidatePassword';

export const loginValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .test('validate-password', 'Invalid password', function (value) {
      const passwordValidation = validatePassword(value, value); // בדיקה מתוך validatePassword
      return (
        passwordValidation.length &&
        passwordValidation.number &&
        passwordValidation.specialChar &&
        passwordValidation.match
      );
    })
    .test('yup-password', 'Yup password validation failed', function (value) {
      // הוספת בדיקות נוספות כפי שתרצי
      return true; // החזרת ערך ברירת המחדל או תוצאת הבדיקה
    })
    .required('Password is required'),
});
