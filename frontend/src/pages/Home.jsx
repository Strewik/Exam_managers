import { useState, useEffect } from "react";
import api from "../api";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  },[]);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete${id}`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted successfully");
        else alert("Fqiled to delete note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created");
        else alert("Failed to create note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div>Notes</div>
      <div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <label htmlFor="content">Content:</label>

          <textarea
            type="text"
            id="content"
            name="content"
            required
            onChange={(e) => setContent(e.target.value)}
            value={content }
          />
          <br />
          <input type="submit" value="Submit" />

        </form>
      </div>
    </>
  );
};

export default Home;
