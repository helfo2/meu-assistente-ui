const getAuthToken = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
};

export default getAuthToken;
