const urlInput = document.getElementById("url-input");
const expiryInput = document.getElementById("expire-input");
const resultedShortURl = "";
const getShortenedURL = async () => {
  try {
    const response = await axios.post("/api/urls", {
      originalUrl: urlInput.value,
      expires: expiryInput.value,
    });
    urlInput.value = "";
    window.location.href = "/listedUrls";
    expiryInput.value = "";
    console.log("result", response.data.result);
  } catch (error) {
    console.log("error", error.response.data);
  }
};

const getShortenedURLDeleted = async (id) => {
  try {
    const response = await axios.delete(`/api/urls/${id}`);
    location.reload();
    console.log("Response", response);
  } catch (error) {
    console.log("Error", error);
  }
};

