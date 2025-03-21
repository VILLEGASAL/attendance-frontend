import React, { useState } from "react";
import styles from "../styles/record.module.css";

export const Records = (props) => {
    const [loadingId, setLoadingId] = useState(null); // Track loading state for a specific row

    const handleDeleteBtn = async (attendance_id) => {
        setLoadingId(attendance_id); // Set the clicked button to "Deleting..."

        try {
            await props.deleteAttendance(attendance_id);
        } catch (error) {
            console.error("Error deleting attendance:", error);
        }

        setLoadingId(null); // Reset loading state after deletion
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date (YYYY-MM-DD)</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Total Hours</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.attendance.length > 0 ? (
                        props.attendance.map((att) => (
                            <tr key={att.attendance_id}>
                                <td>{att.attendance_date.split("T")[0]}</td>
                                <td>{att.time_in}</td>
                                <td>{att.time_out}</td>
                                <td>{att.total_hours}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDeleteBtn(att.attendance_id)} 
                                        disabled={loadingId === att.attendance_id}
                                        className={styles.deleteButton}
                                    >
                                        {loadingId === att.attendance_id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={styles.loadingText}>No Attendance To Display</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
