import { api } from "./api";

export type User = {
    id: string;
    name: string;
    email: string;
};

export type AuthResponse = {
    user: User;
    token?: string;
};

const takeToken = (r: AuthResponse) => r.token ?? "";

export async function login(email: string, password: string) {
    const { data } = await api.post<AuthResponse>("/sign-in", { email, password });
    return { user: data.user, token: takeToken(data) };
}

export async function register(name: string, email: string, password: string) {
    const { data } = await api.post<AuthResponse>("/users/sign-up", { name, email, password });
    return { user: data.user, token: takeToken(data) };
}
