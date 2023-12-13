const ValidatePassword = (password, confirmPassword) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
  
    const lengthValid = password.length >= 8;
    const numberValid = /\d/.test(password);
    const specialCharValid = /[!@#$%^&*]/.test(password);
    const matchValid = password === confirmPassword;
  
    setValidationResults({
      length: lengthValid,
      number: numberValid,
      specialChar: specialCharValid,
      match: matchValid,
    });
  };
  export default ValidatePassword