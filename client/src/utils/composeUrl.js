// Create query string with filters
const composeUrl = (url, filters) => {
  let composedUrl = url;
  let query = "?";

  // Loop through the filters object
  Object.keys(filters).forEach((key) => {
    // Check if the filter has a value to append it to the new url
    if (key === "averageRating" && filters[key]) {
      composedUrl = composedUrl + `${query}${key}[gt]=${filters[key]}`;
      query = "&";
    }

    if (key === "averageCost" && filters[key]) {
      composedUrl = composedUrl + `${query}${key}[lte]=${filters[key]}`;
      query = "&";
    }

    if (key === "careers" && filters[key]) {
      composedUrl = composedUrl + `${query}${key}[in]=${filters[key]}`;
      query = "&";
    }
  });

  return composedUrl;
};

export default composeUrl;
