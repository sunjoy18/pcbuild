import api from "./api";

export const getProduct = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "fetch failed";
    }
};

export const getProductDetails = async (id: string) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "fetch detail failed";
    }
};
