import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Form, Link, redirect } from "react-router-dom";

function NewPostPage() {
  return (
    <Modal>
      <Form method="POST" className={classes.form}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea name="body" id="body" required rows={3}/>
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input name="author" type="text" id="name" required/>
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button type="submit">Add Post</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPostPage;

export async function action({ request, params }) {
  const formData = await request.formData();

  
  const newPost = {
    author: formData.get("author"),
    body: formData.get("body"),
  };
  
  const response = await fetch("http://localhost:8080/posts", {
    body: JSON.stringify(newPost),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return response;
  }

  return redirect("/");
}
