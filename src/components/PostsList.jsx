import { Suspense } from "react";
import Post from "./Post";
import classes from "./PostsList.module.css";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { createPortal } from "react-dom";

function PostsList() {
  const { posts } = useLoaderData();

  return (
    <Suspense
      fallback={createPortal(
        <LoadingSpinner />,
        document.getElementById("loading")
      )}
    >
      <Await resolve={posts}>
        {(loadedPosts) => {
          let content = (
            <div style={{ textAlign: "center", color: "white" }}>
              <h2>There are no posts yet.</h2>
              <p>Start adding some!</p>
            </div>
          );

          if (loadedPosts?.length > 0) {
            content = (
              <ul className={classes.posts}>
                {loadedPosts.map((item) => (
                  <Post
                    key={item.id}
                    id={item.id}
                    author={item.author}
                    body={item.body}
                  />
                ))}
              </ul>
            );
          }
          return content;
        }}
      </Await>
    </Suspense>
  );
}

export default PostsList;

async function loaderPosts() {
  const response = await fetch("http://localhost:8080/posts");

  if (!response.ok) {
    throw json(
      { message: "Could not fecth posts" },
      {
        status: 500,
      }
    );
  }
  const responseData = await response.json();

  return responseData.posts;
}

export function loader() {
  return defer({
    posts: loaderPosts(),
  });
}
