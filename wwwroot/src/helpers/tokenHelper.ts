export const clearToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  const token = localStorage.getItem("token");

  if (token) {
    return token;
  }

  clearToken();
  return null;
};
