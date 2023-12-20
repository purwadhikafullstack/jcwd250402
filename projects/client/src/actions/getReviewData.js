import api from "../api";

export default async function getReviewData(propertyId) {
  try {
    const reviewData = await api.get(`/review/${propertyId}`);
    if (reviewData.status === 200) {
      const review = reviewData.data;
      return review;
    }
  } catch (error) {
    console.log(error);
  }
}
