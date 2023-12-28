import { LoginResponse } from '../models/login/LoginResponse';
import AuthRepository from '../repositories/AuthRepository';

export default class AuthService{

    public static async login(email: string, password:string, isMock: boolean = false): Promise<LoginResponse|null> {
        if(isMock){
            return{
                access_token: "token",
                cellphone_work: "cellphone_work",
                msg: "msg",
                status: "status"
            }
        }else{
            const token = await AuthRepository.login(email, password);
            return token;
        }
            
    }


    public static async validateToken(isMock: boolean = false): Promise<boolean> {
        if(isMock){
            return true;
        }else{
            const isValid = await AuthRepository.validateToken();
            return isValid;
        }
    }
}