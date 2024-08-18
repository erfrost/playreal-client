const getUsernameFromEmail = (email: string) => {
  if (!email) return "";
  const [username] = email.split("@");
  return username;
};

export default getUsernameFromEmail;
