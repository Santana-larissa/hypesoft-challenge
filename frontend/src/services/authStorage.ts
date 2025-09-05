export const tokenKey = "hs_token";

export const getToken = () => localStorage.getItem(tokenKey);
export const setToken = (t: string) => localStorage.setItem(tokenKey, t);
export const clearToken = () => localStorage.removeItem(tokenKey);

export const isAuthenticated = () => !!getToken();
