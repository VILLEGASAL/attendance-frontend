import React from "react";
import styles from "../styles/record.module.css"; // Ensure the CSS file is imported

export const Records = (props) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date (YYYY-MM-DD)</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Total Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {props.attendance.length > 0 ? (
                        props.attendance.map((att) => (
                            <tr key={att.attendance_id}>
                                <td>{new Date(att.attendance_date).toLocaleDateString("en-CA")}</td>
                                <td>{att.time_in}</td>
                                <td>{att.time_out}</td>
                                <td>{att.total_hours}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className={styles.loadingText}>No Attendance To Display</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
