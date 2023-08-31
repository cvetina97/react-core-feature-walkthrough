import { createPortal } from "react-dom";
import LoadingSpinner from "./LoadingSpinner";
import Post from "./Post";
import classes from "./PostsList.module.css";
import { useEffect, useState } from "react";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/posts");
        if (!response.ok) {
          throw new Error("Cannot get posts");
        }
        const responseData = await response.json();

        setPosts(responseData.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
      {isLoading &&
        createPortal(<LoadingSpinner />, document.getElementById("loading"))}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && content}
    </>
  );
}

export default PostsList;
