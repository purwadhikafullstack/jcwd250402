import api from "../api";

export default async function getListings() {
  try {
    const listings = await api.get("/property/");
    if (listings.status === 200) {
      return listings.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
}
