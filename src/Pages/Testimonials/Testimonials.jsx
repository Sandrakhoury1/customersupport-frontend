import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import TestimonialCard from "../../Components/TestimonialsCard/TestimonialsCard";
import jwt_decode from "jwt-decode";
import CarouselMulti from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  getTestimonials,
  createTestimonial,
} from "../../Redux/Testimonials/TestimonialsActions";
import Loader from "../../Components/Loader/Loader";
import isAuth from "../../Utils/isAuth";

function Testimonials() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTestimonials());
  }, []);
  const { testimonials, Loading } = useSelector((state) => state.Testimonials);
  const responsive3 = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1400, min: 940 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 940, min: 0 },
      items: 1,
    },
  };
  const [id, setid] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (isAuth()) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setid(decoded.id);
    }
  }, [isAuth()]);
  const handleClosePopup2 = () => {
    setIsOpen(false);
  };
  const handlecreate = () => {
    dispatch(createTestimonial(description, id));
    setDescription("");
    setIsOpen(false);
  };

  return (
    <>
      {Loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="Main_test_div">
          <div className="testimonials_heading">Testimonials</div>
          <div className="testimonials_subheading">
            What our customers say about us
          </div>

          <div className="masterclass_body_fourth_div">
            <div className="green_carousell">
              <CarouselMulti
                swipeable={true}
                draggable={true}
                showDots={true}
                arrows={true}
                responsive={responsive3}
              >
                {testimonials?.map((item) => (
                  <TestimonialCard
                    text={item.review}
                    subs={item.user.first_name + " " + item.user.last_name}
                  />
                ))}
              </CarouselMulti>
            </div>
            {isAuth() && (
              <button
                className="testimonial_Add"
                onClick={() => setIsOpen(!isOpen)}
              >
                Add Testimonial
              </button>
            )}

            {isOpen && (
              <div
                className="modal show"
                tabIndex="-1"
                role="dialog"
                style={{ display: "block" }}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Testimonial</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClosePopup2}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handlecreate}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Testimonials;
