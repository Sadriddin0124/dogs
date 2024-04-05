import axios from "axios";
import {create} from "zustand"
const useGetDogStore = create((set) => ({
    images: [],
    getImages: async()=> {
        try {
            const response = await axios.get("https://dog.ceo/api/breeds/image/random")
            console.log(response?.data);
            set({images: response?.data})
        } catch (error) {
            console.log(error);
        }
    }
}))

export default useGetDogStore