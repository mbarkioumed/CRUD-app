import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);
    // Use environment variable for the API base URL
    const API_BASE_URL =
        process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("${API_BASE_URL}/users");
        // Fetch notes for each user
        const usersWithNotes = await Promise.all(
            result.data.map(async (user) => {
                const notesResult = await axios.get(
                    `${API_BASE_URL}/user/${user.id}/notes`
                );
                user.notes = notesResult.data;
                return user;
            })
        );
        setUsers(usersWithNotes);
    };

    const deleteUser = async (id) => {
        await axios.delete(`${API_BASE_URL}/user/${id}`);
        loadUsers();
    };

    // Function to calculate the average mark for a user
    const calculateAverageMark = (notes) => {
        if (notes.length === 0) return -1;
        const totalMarks = notes.reduce((sum, note) => sum + note.mark, 0);
        return totalMarks / notes.length;
    };

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">S.N</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Date de Creation</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            const averageMark = calculateAverageMark(
                                user.notes
                            );
                            const nameStyle = {
                                color: averageMark >= 10 ? "green" : "red",
                            };

                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td
                                        style={
                                            averageMark === -1
                                                ? null
                                                : nameStyle
                                        }
                                    >
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.creationDate.substring(0, 10)}
                                    </td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewuser/${user.id}`}
                                        >
                                            Details
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
