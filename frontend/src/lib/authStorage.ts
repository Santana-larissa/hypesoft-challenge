const TOKEN_KEY = "hs_token";
const USER_KEY = "hs_user";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export type StoredUser = { id: string; name: string; email: string } | null;

export const getStoredUser = (): StoredUser => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
};
export const setStoredUser = (u: StoredUser) => {
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
    else localStorage.removeItem(USER_KEY);
};
export const clearStoredUser = () => localStorage.removeItem(USER_KEY);
