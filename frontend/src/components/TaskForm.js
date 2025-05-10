import React, { useState, useEffect } from "react";
import { createTask } from "../services/taskService"; // ✅ createTask को import करें

function TaskForm({ onTaskCreated }) {
    const [company, setCompany] = useState("");
    const [job, setJob] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
        setDateApplied(today);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare new task data
        const newTask = {
            company,
            job,
            dateApplied
        };

        // Call createTask from taskService
        try {
            await onTaskCreated(newTask);
            setCompany(""); // Reset form fields
            setJob("");
            setDateApplied(new Date().toISOString().split("T")[0]);
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
            <label style={styles.label}>Company:</label>
            <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                style={styles.input}
            />
        </div>
        <div style={styles.formGroup}>
            <label style={styles.label}>Job:</label>
            <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
                style={styles.input}
            />
        </div>
        <div style={styles.formGroup}>
            <label style={styles.label}>Date Applied:</label>
            <input
                type="date"
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                required
                style={styles.input}
            />
        </div>
        <button type="submit" style={styles.button}>Add Task</button>
    </form>
    
    );
}
const styles = {
    form: {
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px"
    },
    label: {
        marginBottom: "5px",
        fontWeight: "bold",
        color: "#333"
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #ccc"
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#2c3e50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer"
    }
};

export default TaskForm;
