import axios from "axios";

const API_KEY = '24390496-f177996fbfc0d62e3e8be5e3c';

export const settings = { userQuery: '', pageNumber: 1 };


async function getImages() {
  const axiosConfig = {
    baseURL: "https://pixabay.com/api",
    https: true,
     // search images
    params: {
      key: `${API_KEY}`, // pixabay options
      q: `${settings.userQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${settings.pageNumber}`,
      per_page: 40,
    },
  };
 /*  try {
    const {data} = await axios(axiosConfig);
    console.log(data);
    settings.pageNumber += 1;
    console.log(settings.pageNumber);
    return data;
  } catch (error) {
    console.log(error);
  } */
}



export default getImages;