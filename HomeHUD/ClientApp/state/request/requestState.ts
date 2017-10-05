import { IUser } from '../config/configState';

export interface IRequestState {
    baseUrl: string;
    loginRedirectUrl: string;
    isAuthenticated: boolean;
    authenticationToken: string;
    user?: IUser;
}