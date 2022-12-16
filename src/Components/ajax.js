import axios from "axios";
const apiHost = "https://bakesaleforgood.com/";

export default {
  async fetchDealDetail(dealId) {
    const config = {
      method: "get",
      url: "https://bakesaleforgood.com/api/deals/" + dealId,
    };

    const res = await axios(config);

    console.log(res.status);

    return res.data;
  },

  async fetchDealsSearchResults(searchTerm) {
    const config = {
      method: "get",
      url: "https://bakesaleforgood.com/api/deals?searchTerm=" + searchTerm,
    };

    const res = await axios(config);

    console.log(res.status);

    return res.data;
  },

  // async fetchDealDetail(dealId) {
  //   let res = await axios.get(
  //     "https://bakesaleforgood.com/api/deals"`${dealId}`
  //   );

  //   return res.data;
  // },

  async fetchInitialDeals() {
    let res = await axios.get("https://bakesaleforgood.com/api/deals");

    return res.data;
  },
};
