import DriverRepository from "../repositories/DriverRepository"

export default class DriverService {

    public static async getById(id, isMock: boolean = false) {
        if(isMock){
            return
        }else{
            return await DriverRepository.getById(id);
        }
    }

    public static async getFilteredDrivers(filtersString, offset, limit,count= null, isMock: boolean = false) {
        if(isMock){
            return {
                drivers: [ 
                ],
                total: 20
            }
        }else{
            return await DriverRepository.getFilteredDrivers(filtersString, offset, limit,count );
        }
    }

    public static async updateDriver(driver, isMock: boolean = false) {
        if(isMock){
            return
        }else{
            return await DriverRepository.updateDriver(driver);
        }
    }
}