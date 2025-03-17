import React from "react";
import styles from '../styles/employee.module.css';


export const Employee = (props) => {

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    

    return(

        <>
            <div className={styles.employee_name_container }>
                <h1 className={styles.name}>{props.name}</h1>
            </div>
            
            <div className={styles.x}>
                <div className={styles.current_date_container}>
                    <p className={styles.date}>Current Date (YYYY-MM-DD)</p>

                    <div className={styles.data_container}>
                        <h1>{formattedDate}</h1>
                    </div>
                </div>
                
                <div className={styles.current_date_container}>
                    <p className={styles.date}>Total Hours</p>

                    <div className={styles.data_container}>
                        <h1>{props.total_hours}</h1>
                    </div>
                </div>

                <div className={styles.current_date_container}>
                    <p className={styles.date}>Remaining Hours</p>

                    <div className={styles.data_container}>
                        <h1>{props.remaining_hours}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}