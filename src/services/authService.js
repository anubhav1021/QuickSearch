import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const login = async (username, password) => {

    const response = await axios.post(

        `${API}/login`,

        {

            username,

            password

        }

    );

    return response.data;

};