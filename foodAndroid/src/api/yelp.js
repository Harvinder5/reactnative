import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer f9i7PEh7KsebJJDLqRr81d5cNYtzFKJ3TMt2hfrS0RBmVDtq06DYRNhK0qlnmhyLsUk9focuyDz2SJBWJfS_AJzc5IxVWuOP8yo0ywqnRWJjeAAtSCk-jBm82HPbXXYx"
  }
});
