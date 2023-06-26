import axios from "axios";
import { TestimonialsActions } from "./TestimonialsReducers";

export const getTestimonials = () => async (dispatch) => {
  try {
    dispatch(TestimonialsActions.TestimonialsRequest());
    const res = await axios.get(process.env.REACT_APP_API + "/testimonial");
    dispatch(TestimonialsActions.TestimonialsSuccess(res.data));
  } catch (error) {
    dispatch(TestimonialsActions.TestimonialsFail(error.message));
  }
};
export const createTestimonial = (review, user) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    dispatch(TestimonialsActions.addtestimonialRequest());
    const res = await axios.post(
      process.env.REACT_APP_API + "/testimonial",
      { review, user },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch(TestimonialsActions.addtestimonialSuccess(res.data));
    dispatch(getTestimonials());
  } catch (error) {
    dispatch(TestimonialsActions.addtestimonialFail(error.message));
  }
};
