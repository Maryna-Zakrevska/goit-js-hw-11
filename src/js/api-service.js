import axios from "axios";

const API_KEY = '24390496-f177996fbfc0d62e3e8be5e3c';


export const settings = { userQuery: '', pageNumber: 1 };

async function getImages() {
  const axiosConfig = {
    baseURL: "https://pixabay.com/api", // search images
    params: {
      key: `${API_KEY}`, // pixabay options
      q: `${userQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: pageNumber,
      per_page: 40,
    },
  };
  try {
    const response = await axios(axiosConfig);
    console.log(response);
    pageNumber += 1;
    console.log(pageNumber);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

