import { Outlet } from "react-router-dom";
import PostsList from "../components/PostsList";

function PostsPage() {
  return (
    <>
      <Outlet />
      <PostsList />
    </>
  );
}

export default PostsPage;
