import axios from "axios";
import delayAdapterEnhancer from "axios-delay";
const URL = "https://pixabay.com/api/";
const KEY = "29049670-414694ca11112f13396dffd69";

const api = axios.create({
  adapter: delayAdapterEnhancer(axios.defaults.adapter),
});

const fetchDataApi = async (searchQuery, page = 1) => {
  const { data } = await api.get(
    `${URL}?key=${KEY}&per_page=12&page=${page}&q=${searchQuery}`,
    {
      delay: 1000, // delay 1 second
    }
  );
  return data;
};

export default fetchDataApi;
