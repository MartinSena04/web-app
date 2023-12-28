import { LoginResponse } from '../models/login/LoginResponse';
import {axiosInstance} from '../../config'


export default class AuthRepository {
    
    public static async login(email: string, password:string): Promise<LoginResponse|null> {
        const body = {
            email: email, 
            password: password
        };    
        try{
            const response = await axiosInstance.post('/login', body)
            const data = response.data as LoginResponse;
            return data;
        }catch(error){
            return null;
        }
    }

    public static async validateToken(): Promise<boolean> {
        try{
            await axiosInstance.post('/verify-token')
            return true;
        }catch(error){
            return false;
        }
    }

}