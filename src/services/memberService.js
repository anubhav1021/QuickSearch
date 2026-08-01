import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/members`;

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getMembers = async () => {

    const response = await axios.get(
        API,
        getHeaders()
    );

    return response.data.data;

};