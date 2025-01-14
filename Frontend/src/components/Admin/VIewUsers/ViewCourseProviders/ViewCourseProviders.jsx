import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewCourseProviders() {
    const [user, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`http://localhost:7001/api/users/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsers(response.data);
            } catch (err) {
                alert("Couldn't fetch the users");
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    const courseProviders = user.filter((c) => c.role === 'courseProvider');

    return (
        <div className="h-screen flex flex-col items-center bg-gray-100">
            <h1 className="mt-[150px] text-4xl font-bold text-gray-800">All Course Providers</h1>

            <div className="mt-10 w-full max-w-4xl">
                <table className="min-w-full border border-gray-300 bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseProviders.length > 0 ? (
                            courseProviders.map((provider, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                    } hover:bg-blue-100`}
                                >
                                    <td className="px-6 py-4 text-gray-700">{provider.name}</td>
                                    <td className="px-6 py-4 text-gray-700">{provider.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={2}
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No course providers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewCourseProviders;
