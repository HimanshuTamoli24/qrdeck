import  { AxiosInstance } from "axios";
import axiosInstance from "@/lib/axiosinstance";

export class BaseService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axiosInstance
    }

    async createQr(payload: any) {
        const { data } = await this.axios.post("/qr", payload);
        return data;
    }

    async getAllQr() {
        const { data } = await this.axios.get("/qr");
        return data;
    }

    async getQr(id: string) {
        const { data } = await this.axios.get(`/qr/${id}`);
        return data;
    }

    async updateQr(id: string, updateData: any) {
        const { data } = await this.axios.patch(`/qr/${id}`, updateData);
        return data;
    }

    async deleteQr(id: string) {
        const { data } = await this.axios.delete(`/qr/${id}`);
        return data;
    }
}

export const baseService = new BaseService();
