import {API_END_POINTS} from "../constants/EndPoints";
import axiosInstance from "../axios/axiosInstance";


export const addToCartApi = async (apidata) => {
    return await axiosInstance.post(API_END_POINTS.addtocart, apidata);
}



export const getCartItems  = async () => {

    return  await axiosInstance.get(API_END_POINTS.cart);
}