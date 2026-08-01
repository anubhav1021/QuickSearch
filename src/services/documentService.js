import axios from "axios";

const API = "http://localhost:5000/api/documents";

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