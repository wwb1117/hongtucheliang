import HttpClient from 'utils/HttpClient';
import * as BaseUrl from 'api/BaseUrl'

export function login(params) {
    return HttpClient.post(BaseUrl.Login, params);
}

export function logout() {
    return HttpClient.get(BaseUrl.Logout);
}



