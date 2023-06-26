import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import {
  gettestimonialsAdmin,
  createtestimonial,
} from "../../Redux/Admin/Statistics/StatisticsActions";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
const TestimonialTable = () => {
  const dispatch = useDispatch();
  const { Testimonials, Loading } = useSelector((state) => state.Stats);
  useEffect(() => {
    dispatch(gettestimonialsAdmin());
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    review: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTestimonial({ name: "", review: "" });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTestimonial((prevTestimonial) => ({
      ...prevTestimonial,
      [name]: value,
    }));
  };
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const user_id = decoded.id;

  const handleCreateTestimonial = () => {
    // Validate the form fields here if needed
    dispatch(createtestimonial(newTestimonial.review, user_id));
    handleCloseModal();
  };

  return (
    <div className="Table_cont">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {Testimonials.map((testimonial) => (
            <tr key={testimonial.id}>
              <td>
                {testimonial.user.first_name + " " + testimonial.user.last_name}
              </td>
              <td>{testimonial.review}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleOpenModal}>
        Add Testimonial
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReview">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="review"
                value={newTestimonial.review}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateTestimonial}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TestimonialTable;
