import {get, instance, post} from "../utils/service.util";
import {UserInfoModel} from '../models/userinfo.model';

export const getHighscore = async () => {
    return await get<string>('/highscore');
}

export const getUserInfo = async () => {
    return await get<UserInfoModel>('/profile')
}

export const registerUser = async (username: string, password: string) => {
    try {
        const response = await instance.post('/register', {username, password});

        return response.status === 201;
    }
    catch (error) {
        return false;
    }
}

export const loginUser = async (username: string, password: string) => {
    return await post('/callback?client_name=FormClient',
        `username=${username}&password=${password}`,
        {'Content-Type': 'application/x-www-form-urlencoded'});
}