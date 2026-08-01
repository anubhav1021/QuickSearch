import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/documents`;

const getHeaders = () => ({

    headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`

    }

});

export const getDocuments = async () => {

    const response = await axios.get(

        API,

        getHeaders()

    );

    return response.data.data;

};

export const deleteDocument = async (id) => {

    await axios.delete(

        `${API}/${id}`,

        getHeaders()

    );

};