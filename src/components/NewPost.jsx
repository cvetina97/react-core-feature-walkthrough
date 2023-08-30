import { useState } from "react";
import classes from "./NewPost.module.css";

function NewPost(props) {
  const [enteredText, setEnteredText] = useState("");
  const [enteredName, setEnteredName] = useState("");

  const inputTextHandler = (e) => {
    setEnteredText(e.target.value);
  };

  const inputNameHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const newItem = {
      author: enteredText,
      body: enteredName,
    };

    props.onAddPost(newItem);
  };

  return (
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
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit">Add Post</button>
      </p>
    </form>
  );
}

export default NewPost;
