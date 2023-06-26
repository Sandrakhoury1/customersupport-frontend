import React, { useState, useEffect } from "react";
import "./ComunityPosts.css";
import { AiOutlineUser } from "react-icons/ai";
import homePage3 from "../../assets/images/Home/homePage3.webp";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  addPost,
  addComment,
} from "../../Redux/ComunityPost/ComunityPostActions";
import jwt_decode from "jwt-decode";
import Loader from "../../Components/Loader/Loader";
import isAuth from "../../Utils/isAuth";

function ComunityPosts() {
  const dispatch = useDispatch();
  const [showAddTicketModal, setshowAddTicketModal] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setcontent] = useState("");
  const [id, setid] = useState("");
  const handleClosePopup2 = () => {
    setshowAddTicketModal(false);
  };
  const { Posts, Comments, Loading } = useSelector((state) => state.Posts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  useEffect(() => {
    if (isAuth()) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      setid(decoded.id);
    }
  }, [isAuth()]);

  const handleSubmit = () => {
    dispatch(addPost(content, image, id));
    setshowAddTicketModal(false);
    setcontent("");
    setImage(null);
    setImagePreview(null);
  };
  const [commentdata, setcommentdata] = useState("");
  const handleaddComment = (postid) => {
    dispatch(addComment(commentdata, id, postid));
    setcommentdata("");
  };

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <div className="title_cont">
            <h1 className="title">Community Posts</h1>
          </div>

          {Posts?.map((post) => (
            <div className="container">
              <div className="row_comunity">
                <div className="col-md-6 offset-md-3">
                  <div className="card">
                    <img
                      src={process.env.REACT_APP_API + "/images/" + post.image}
                      className="card-img-top"
                      alt="Community Post"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{post.content}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      {post.comments.length > 0 &&
                        post.comments.map((comment) => (
                          <li className="list-group-item">
                            <div className="d-flex align-items-start">
                              <AiOutlineUser
                                className="header-icons"
                                size={40}
                              />
                              <div className="ms-3">
                                <h6 className="fw-bold">
                                  {comment.user.first_name +
                                    " " +
                                    comment.user.last_name}
                                </h6>
                                <p>{comment.content}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <div className="card-body">
                      <div className="input-group mb-3">
                        <AiOutlineUser className="header-icons" size={40} />

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Write a Comment"
                          value={commentdata}
                          onChange={(e) => setcommentdata(e.target.value)}
                        />
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleaddComment(post.id);
                          }}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="bottom_space">
            <button
              className="btn btn-primary"
              onClick={() => setshowAddTicketModal(!showAddTicketModal)}
            >
              Create a Post
            </button>
          </div>
          {showAddTicketModal && (
            <div
              className="modal show"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Post</h5>
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
                        <label htmlFor="image">Image</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="image"
                          onChange={(e) => {
                            const selectedImage = e.target.files[0];
                            setImage(selectedImage);
                            setImagePreview(URL.createObjectURL(selectedImage));
                          }}
                        />
                      </div>

                      {imagePreview && (
                        <div className="form-group">
                          <img
                            src={imagePreview}
                            alt="Selected"
                            className="img-fluid"
                          />
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="title">Caption</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          value={content}
                          onChange={(e) => setcontent(e.target.value)}
                          required
                        />
                      </div>

                      <div
                        className="btn btn-primary spacing"
                        onClick={() => handleSubmit()}
                      >
                        Submit
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ComunityPosts;
