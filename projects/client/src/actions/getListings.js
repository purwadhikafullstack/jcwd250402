import api from "../api";

export default async function getListings(limit, page, sort) {
  if (!limit) {
    limit = 18;
  }
  try {
    const listings = await api.get(
      `/property?limit=${limit}&page=${page}&sort=${sort}`
    );
    if (listings.status === 200) {
      return listings.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
  }
}
