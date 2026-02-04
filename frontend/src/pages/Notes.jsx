import React, { useState, useEffect } from "react";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState(null);

    // Fetch notes on Load
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await fetch("https://todo-backend-4xu0.onrender.com/api/notes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Add new note
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!title) return;
        try {
            const res = await fetch("https://todo-backend-4xu0.onrender.com/api/notes", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                
                },
                body: JSON.stringify({ title, content }),
            });
            
            setTitle("");
            setContent("");
            fetchNotes();  // Refresh notes
        } catch (err) {
            console.error(err);
        }
    };

    // Edit note
    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditingId(note._id);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!title) return;
        try {
            await fetch(`https://todo-backend-4xu0.onrender.com/api/notes/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                           "Authorization": `Bearer ${localStorage.getItem("token")}`


                },
                body: JSON.stringify({ title, content }),
            });
            setTitle("");
            setContent("");
            setEditingId(null);
            fetchNotes();

        } catch (err) {
            console.error(err);
        }
    };

    // Delete note
    const handleDelete = async (id) => {
        try {
            await fetch(`https://todo-backend-4xu0.onrender.com/api/notes/${id}`, { 
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            
            });
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="notes-container">
            <div className="notes-header">
                <h2>My Notes</h2>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <form
              onSubmit={editingId ? handleUpdate : handleAdd}
              className="notes-form"
            >
                <label className="input-label">Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label className="input-label">Content</label>
                <textarea
                  className="textarea-field"
                  placeholder="Note content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <button type="submit" className="add-btn">
                    {editingId ? "Update Note" : "Add Note"}
                </button>    
                
                
                
                
            </form>  

            <ul className="notes-list">
                {notes.map((note) => (
                    <li key={note._id} className="note-card">
                        <div className="note-text">
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>

                        <div className="note-actions">
                            <button
                             className="edit-btn"
                             onClick={() => handleEdit(note)}
                            >
                                Edit 
                            </button> 

                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(note._id)}
                            >
                                Delete
                            </button>  
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
