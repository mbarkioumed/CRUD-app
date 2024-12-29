import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
    const [user, setUser] = useState({
        name: "",
    });
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ subject: "", mark: "" }); // For the new note form
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    // Use environment variable for the API base URL
    const API_BASE_URL =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

    useEffect(() => {
        loadUser();
        loadNotes();
    }, []);

    const loadUser = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${API_BASE_URL}/user/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error loading user:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadNotes = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${API_BASE_URL}/user/${id}/notes`);
            setNotes(result.data);
        } catch (error) {
            console.error("Error loading notes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async () => {
        if (!newNote.subject || !newNote.mark) {
            alert("Please provide both subject and mark.");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/user/${id}/notes`, newNote);
            loadNotes(); // Reload notes after adding a new one
            setNewNote({ subject: "", mark: "" }); // Reset form
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({ ...newNote, [name]: value });
    };

    const getBackgroundColor = (mark) => {
        return mark < 10 ? "#FF474C" : "#224D44";
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Details de L'etudiant</h2>

                    <div className="card">
                        <div className="card-header">
                            Details de L'etudiant id : {user.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name:</b> {user.name}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="py-4">
                        <h3>Notes</h3>
                        <table className="table border shadow">
                            <thead>
                                <tr>
                                    <th scope="col">S.N</th>
                                    <th scope="col">Sujet</th>
                                    <th scope="col">Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.map((note, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            backgroundColor: getBackgroundColor(
                                                note.mark
                                            ),
                                        }}
                                    >
                                        <th
                                            scope="row"
                                            style={{
                                                backgroundColor:
                                                    getBackgroundColor(
                                                        note.mark
                                                    ),
                                            }}
                                        >
                                            {index + 1}
                                        </th>
                                        <td
                                            style={{
                                                backgroundColor:
                                                    getBackgroundColor(
                                                        note.mark
                                                    ),
                                            }}
                                        >
                                            {note.subject}
                                        </td>
                                        <td
                                            style={{
                                                backgroundColor:
                                                    getBackgroundColor(
                                                        note.mark
                                                    ),
                                            }}
                                        >
                                            {note.mark}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Ajouter Note Section */}
                    <div className="mt-4">
                        <h4>Ajouter une Note</h4>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Sujet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    value={newNote.subject}
                                    onChange={handleInputChange}
                                    placeholder="Enter subject"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Note</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="mark"
                                    value={newNote.mark}
                                    onChange={handleInputChange}
                                    placeholder="Enter mark"
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleAddNote}
                            >
                                Ajouter Note
                            </button>
                        </form>
                    </div>

                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
