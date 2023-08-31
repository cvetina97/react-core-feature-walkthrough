import { useState } from "react";
import classes from "./NewPost.module.css";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";

function NewPostPage() {
  const [enteredText, setEnteredText] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputTextHandler = (e) => {
    setEnteredText(e.target.value);
  };

  const inputNameHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const newItem = {
      author: enteredText,
      body: enteredName,
    };

    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/posts", {
        body: JSON.stringify(newItem),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      navigate("..");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={inputTextHandler} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" required onChange={inputNameHandler} />
        </p>
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button type="submit">Add Post</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPostPage;
