import React, { useEffect, useState } from "react";
import { Card, Title, Text, Image } from "@mantine/core";
import getReviewData from "../actions/getReviewData";
import ReactStars from "react-rating-stars-component";
import { formatDistanceToNow } from "date-fns";

// ... (previous imports)

const ReviewCard = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const reviewData = await getReviewData(propertyId);
        setReviews(reviewData.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, [propertyId]);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <Card>
      <Title order={4}>Reviews</Title>
      <div className="flex flex-row mt-4">
        {reviews.map((review) => (
          <div className="" key={review.id}>
            <div className="flex flex-row gap-x-3">
              <div className="rounded-full">
                {review.renter && review.renter.profilePicture ? (
                  <Image
                    src={`https://jcwd250402.purwadhikabootcamp.com/api/profile-picture/${review.renter.profilePicture}`}
                    alt={review.renter.fullname}
                    radius={"xl"}
                    w={20}
                    h={20}
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Pessoa_Neutra.svg"
                    alt="Default"
                    className="w-5 h-5 rounded-full"
                  />
                )}
              </div>
              <div>
                {review.renter ? review.renter.fullname : "Unknown Renter"}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-x-2">
              <ReactStars
                count={5}
                size={13}
                activeColor="#ffd700"
                edit={false}
                isHalf={false}
                value={review.rating}
              />
              {"•"}
              <Text size="sm" c="gray">
                {`${formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}`}
              </Text>
            </div>
            <div className="mt-2 text-md">{review.comment}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ReviewCard;
