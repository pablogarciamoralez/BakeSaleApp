import axios from "axios";
// const apiHost = "https://bakesaleforgood.com/";

export default {
  async fetchInitialDeals() {
    const config = {
      method: "get",
      url: "https://bakesaleforgood.com/api/deals",
    };

    let res = await axios(config);

    console.log(res.status);

    return res.data;
  },
};
