import axiosClient from "./axiosClient";

const postAPI = {
    // upload: (data, onUploadProgress) => {
    //     const url = "/file/upload";
    //     return axiosClient.post(url, data,{
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //         onUploadProgress,
    //     });
    // },

    getFiles: ()=>{
        const url = "/file/files";
        return axiosClient.get(url);
    },

    upload: (data)=>{
        const url = "/post/create";
        return axiosClient.post(url, data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },

    test: (data)=>{
        const url = "/post/test";
        return axiosClient.post(url, data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },

    imgUpload: (data)=>{
        const url = "/post/imgUpload";
        return axiosClient.post(url, data,{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

}

export default postAPI;
