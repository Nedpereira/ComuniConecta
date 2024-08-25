export const getEmailPrefix = (email) => {
    return email?.split('@')[0];
  };