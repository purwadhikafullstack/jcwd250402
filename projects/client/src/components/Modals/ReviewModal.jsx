import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import Heading from "../Heading";
import api from "../../api";
import { toast } from "sonner";
import ReactStars from "react-rating-stars-component";

import useReviewModal from "../hooks/useReviewModal";

const ReviewModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const reviewModal = useReviewModal();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.auth.token);
  const bookingId = useSelector((state) => state.reviewModal.bookingId);

  const onSubmit = async () => {
    setIsLoading(true);
    const reviewData = {
      rating: rating,
      comment: comment,
    };

    try {
      const response = await api.post(
        `/review/create/${bookingId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Review created successfully");
        setIsLoading(false);
        navigate(0);
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const bodyContent = (
    <div className="flex flex-col gap-y-5 justify-evenly">
      <div>
        <Heading title="How was your stay?" />
      </div>
      <div>
        <ReactStars
          count={5}
          size={24}
          activeColor="#ffd700"
          edit={true}
          isHalf={false}
          onChange={handleRatingChange}
        />
      </div>
      <div>
        <textarea
          className="w-full h-24 p-2 border-2 border-gray-300 rounded-md"
          name="comment"
          id="comment"
          cols="50"
          rows="5"
          onChange={handleCommentChange}
        />
      </div>
    </div>
  );
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={reviewModal.isOpen}
        onClose={reviewModal.onClose}
        actionLabel={"Send Review"}
        onSubmit={onSubmit}
        title="Review"
        body={bodyContent}
      />
    </>
  );
};

export default ReviewModal;
