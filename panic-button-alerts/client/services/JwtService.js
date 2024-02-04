import { jwtDecode } from "jwt-decode";
import { get } from "./Storage";

export const decodeToken =async()=>{
    try {
     const token= await get('accessToken');
      const decode = jwtDecode(token)
      return decode
    } catch (error) {
      
    }
  }