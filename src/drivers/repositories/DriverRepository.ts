import { axiosInstance } from "../../config";
import { ApiDriver } from "../types/types";

export default class DriverRepository {

    public static async getById(id) {
        try {
            const response = await axiosInstance.get(`/drivers/get-driver?id=${id}`)
            return response.data.driver as ApiDriver;
        } catch (error) {
            return null;
        }
        
    }

    public static async getFilteredDrivers(filtersString, offset, limit,count) {
        try {
            const response = await axiosInstance.get(`/drivers?${filtersString}&offset=${offset}&limit=${limit}&count=${count ? 'true' : ''}`);
            return response.data as {drivers: ApiDriver[], total: number}
        } catch (error) {
            return null;
        }
    }

    public static async updateDriver(driver) {
        try {
            const response = await axiosInstance.put(`/drivers/update-driver`, driver);
            return response.data as ApiDriver;
        } catch (error) {
            return null;
        }
    }
}