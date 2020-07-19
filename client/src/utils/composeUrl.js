// Create query string with filters
const composeUrl = (url, filters) => {
  let composedUrl = url;

  let query = "?";
  Object.keys(filters).forEach((key) => {
    // Check if the filter has a value to append it to the new url
    if (filters[key]) {
      composedUrl = composedUrl + `${query}${key}[in]=${filters[key]}`;
      query = "&";
    }
  });

  return composedUrl;
};

export default composeUrl;
