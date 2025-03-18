import React from "react";
import styles from "../styles/record.module.css";

export const Records = (props) => {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Date(YYYY-MM-DD)</th>
                        <th style={{textAlign: "center"}}>Time In</th>
                        <th style={{textAlign: "center"}}>Time Out</th>
                        <th style={{textAlign: "center"}}>Total Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {props.attendance.length > 0 ? (

                        props.attendance.map((att, key) => (
                            <tr key={att.attendance_id}>
                                <td style={{textAlign: "center"}}>{new Date(att.attendance_date).toLocaleDateString("en-CA")}</td>
                                <td style={{textAlign: "center"}}>{att.time_in}</td>
                                <td style={{textAlign: "center"}}>{att.time_out}</td>
                                <td style={{textAlign: "center"}}>{att.total_hours}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>Loading attendance...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};
