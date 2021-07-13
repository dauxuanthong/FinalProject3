import axiosClient from "./axiosClient";

const postAPI = {
    upload: (data, onUploadProgress) => {
        const url = "/upload";
        return axiosClient.post(url, data,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    },

    getFiles: ()=>{
        const url = "/files";
        return axiosClient.get(url);
    }
}

export default postAPI;
