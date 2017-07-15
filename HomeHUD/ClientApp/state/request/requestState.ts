export interface IRequestState {
    baseUrl: string;
    loginRedirectUrl: string;
    isAuthenticated: boolean;
    authenticationToken: string;
    user?: IUser;
}

export interface IUser {
    name: string;
}