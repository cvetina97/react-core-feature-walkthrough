import Post from "./Post";
import NewPost from "./NewPost";
import classes from "./PostsList.module.css";
import { useState } from "react";
import Modal from "./Modal";

function PostsList(props) {
  const [posts, setPosts] = useState([]);

  const addPostHandler = (newPost) => {
    const newItem = {
      ...newPost,
      id: new Date().toISOString(),
    };

    setPosts((prevState) => {
      return [...prevState, newItem];
    });

    props.onCloseModal();
  };

  let content = (
    <div style={{ textAlign: "center", color: "white" }}>
      <h2>There are no posts yet.</h2>
      <p>Start adding some!</p>
    </div>
  );

  if (posts.length > 0) {
    content = (
      <ul className={classes.posts}>
        {posts.map((item) => (
          <Post key={item.id} author={item.author} body={item.body} />
        ))}
      </ul>
    );
  }

  return (
    <>
      {props.showModal && (
        <Modal onClose={props.onCloseModal}>
          <NewPost onCancel={props.onCloseModal} onAddPost={addPostHandler} />
        </Modal>
      )}
      {content}
    </>
  );
}

export default PostsList;
