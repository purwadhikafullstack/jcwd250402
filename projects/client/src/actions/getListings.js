import api from "../api";

export default async function getListings(page) {
  try {
    const listings = await api.get(`/property?page=${page}&limit=${18}`);
    if (listings.status === 200) {
      return listings.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
}
