import {API_END_POINTS} from "../constants/EndPoints";
import axiosInstance from "../axios/axiosInstance";

export const signupapi= async (data) => {

    return await axiosInstance.post(API_END_POINTS.signup, data);

} 

export const loginapi = async (data) => {
    return await axiosInstance.post(API_END_POINTS.signin, data);
}
