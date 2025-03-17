import React from "react";
import styles from "../styles/record.module.css";

export const Records = (props) => {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time In</th>
                        <th>Time Out</th>
                        <th>Total Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {props.attendance.length > 0 ? (
                        props.attendance.map((att, key) => (
                            <tr key={att.attendance_id}>
                                <td>{att.attendance_date}</td>
                                <td>{att.time_in}</td>
                                <td>{att.time_out}</td>
                                <td>{att.total_hours}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Loading attendance...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};
