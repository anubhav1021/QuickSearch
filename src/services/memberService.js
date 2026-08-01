import axios from "axios";

const API = "http://localhost:5000/api/members";

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