import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import {
  getfeeds,
  createfeed,
} from "../../Redux/Admin/Statistics/StatisticsActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import jwt_decode from "jwt-decode";

const FeedTable = () => {
  const dispatch = useDispatch();
  const { Feeds, Loading } = useSelector((state) => state.Stats);
  const [image, setimage] = useState(null);
  useEffect(() => {
    dispatch(getfeeds());
  }, []);
  const [feeds, setFeeds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newFeed, setNewFeed] = useState({
    image: null,
    content: "",
    title: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setNewFeed({ image: null, content: "", title: "" });
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewFeed((prevFeed) => ({ ...prevFeed, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setimage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewFeed((prevFeed) => ({ ...prevFeed, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const user_id = decoded.id;

  const handleCreateFeed = () => {
    // Validate the form fields here if needed
    const feed = new FormData();
    feed.append("image", image);
    feed.append("title", newFeed.title);
    feed.append("content", newFeed.content);
    feed.append("user", user_id);
    dispatch(createfeed(feed));

    handleCloseModal();
  };

  return (
    <div className="Table_cont">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {Feeds.map((feed) => (
            <tr key={feed.id}>
              <td>
                <img
                  src={process.env.REACT_APP_API + "/images/" + feed.image}
                  alt="Feed"
                  width="100"
                  height="100"
                />
              </td>
              <td>{feed.title}</td>
              <td>{feed.content}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={handleOpenModal}>
        Create New Feed
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Feed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
              {newFeed.image && (
                <img
                  src={newFeed.image}
                  alt="Preview"
                  width="100"
                  height="100"
                />
              )}
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newFeed.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                value={newFeed.content}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateFeed}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedTable;
