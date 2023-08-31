import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import PostsPage from "./routes/Posts";
import NewPostPage from "./routes/NewPost";
import { loader as getPostsLoader } from "./components/PostsList";
import { action as newPostAction } from "./routes/NewPost";
import PostDetails, {
  loader as getPostDetailsLoader,
} from "./routes/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <PostsPage />,
        loader: getPostsLoader,
        children: [
          {
            path: "create-post",
            element: <NewPostPage />,
            action: newPostAction,
          },
          {
            path: ":id",
            element: <PostDetails />,
            loader: getPostDetailsLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
