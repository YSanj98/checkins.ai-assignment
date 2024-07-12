export const validateUserInputs = (formData, setErrors) => {
  const { name, email, password, confirmPassword } = formData;
  const newErrors = {};

  if (!/^[a-zA-Z\s]{3,20}$/.test(name)) {
    newErrors.name =
      "Please enter a name using 3-20 characters, including letters and spaces only.";
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Please enter a valid email address.";
  }

  if (!/^(?=.*\d)[a-zA-Z\d]{6,20}$/.test(password)) {
    newErrors.password =
      "Password must be 6-20 characters long and include at least one number.";
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  setErrors(newErrors);
  return !Object.keys(newErrors).length;
};
