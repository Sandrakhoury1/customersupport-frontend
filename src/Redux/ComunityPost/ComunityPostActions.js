import axios from "axios";
import { PostsActions } from "./ComunityPostsReducers";

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(PostsActions.PostsRequest());
    const res = await axios.get(process.env.REACT_APP_API + "/post");
    dispatch(PostsActions.PostsSuccess(res.data));
  } catch (error) {
    dispatch(PostsActions.PostsFail(error.message));
  }
};

export const addPost = (content, image, user) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("content", content);
  formData.append("user", user);
  try {
    dispatch(PostsActions.addPostRequest());
    const res = await axios.post(process.env.REACT_APP_API + "/post", formData);
    dispatch(PostsActions.addPostSuccess(res.data));
    dispatch(getPosts());
  } catch (error) {
    dispatch(PostsActions.addPostFail(error.message));
  }
};

export const addComment =
  (content, user, community_post) => async (dispatch) => {
    try {
      dispatch(PostsActions.addCommentRequest());
      const res = await axios.post(
        process.env.REACT_APP_API + "/post/comment",
        {
          content,
          user,
          community_post,
        }
      );
      dispatch(PostsActions.addCommentSuccess(res.data));
      dispatch(getPosts());
    } catch (error) {
      dispatch(PostsActions.addCommentFail(error.message));
    }
  };
