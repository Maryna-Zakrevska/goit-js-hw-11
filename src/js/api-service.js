import axios from "axios";

const API_KEY = "24390496-f177996fbfc0d62e3e8be5e3c";

export const settings = { userQuery: "", pageNumber: 1 };

async function getImages() {
  const axiosConfig = {
    baseURL: "https://pixabay.com/api/",
    // search images
    params: {
      key: `${API_KEY}`,
      q: `${settings.userQuery}`,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      page: settings.pageNumber,
      per_page: 40,
    },
  };
  const { data } = await axios(axiosConfig);
  return data;
}

export default getImages;
