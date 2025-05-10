import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskService";
import TaskForm from "./TaskForm"; 
import { createTask } from "../services/taskService"; // ✅ createTask को import किया
import { deleteTask } from "../services/taskService";
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [filterCompany, setFilterCompany] = useState("");
    const handleCompanyFilterChange = (e) => {
        setFilterCompany(e.target.value);
    };
    const handleDateFilterChange = (e) => {
        setFilterDate(e.target.value);
    }    
    useEffect(() => {
        loadTasks();
    }, []);
    const filteredTasks = filterDate
    ? tasks.filter(task => task.dateApplied === filterDate)
    : tasks;

    const filteredByCompany = filterCompany
    ? filteredTasks.filter(task => task.company.toLowerCase().includes(filterCompany.toLowerCase()))
    : filteredTasks;

    const loadTasks = async () => {
        try {
            const data = await fetchTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    // ✅ handleTaskCreated function को update करें
    const handleTaskCreated = async (newTaskData) => {
        try {
            const newTask = await createTask(newTaskData); // Call createTask from taskService
            setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to list
        } catch (error) {
            console.error("Error creating task", error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id)); // UI से भी हटाएं
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };
    return (    
        <div style={styles.container}>
            <h2 style={styles.heading}>📝 Job List</h2>

            {/* ✅ TaskForm component को यहां Add करें */}
            <TaskForm onTaskCreated={handleTaskCreated} />
            <div style={styles.filterContainer}>
    {/* Date Filter */}
    <label>Filter by Date: </label>
    <input
        type="date"
        value={filterDate}
        onChange={handleDateFilterChange}
        style={styles.filterInput}
    />
</div>

<div style={styles.filterContainer}>
    {/* Company Filter */}
    <label>Filter by Company: </label>
    <input
        type="text"
        value={filterCompany}
        onChange={handleCompanyFilterChange}
        placeholder="Enter company name"
        style={styles.filterInput}
    />
</div>
            <table style={styles.table}>
        <thead>
            <tr>
            <th style={styles.th}>Id</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Job</th>
                <th style={styles.th}>Applied Date</th>
                <th style={styles.th}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {filteredByCompany.map((task) => (
                <tr key={task.id}>
                    <td style = {styles.td}>{task.id}</td>
                    <td style={styles.td}>{task.company}</td>
                    <td style={styles.td}>{task.job}</td>
                    <td style={styles.td}>{task.dateApplied}</td>
                    <td style={styles.td}>
                        <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#f4f6f8",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "sans-serif"
    },
    heading: {
        textAlign: "center",
        color: "#2c3e50"
    },
    list: {
        listStyleType: "none",
        padding: 0
    },
    listItem: {
        backgroundColor: "#fff",
        padding: "12px 16px",
        marginBottom: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "16px",
        color: "#333"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
    },
    th: {
        backgroundColor: "#3498db",
        color: "#fff",
        padding: "10px",
        textAlign: "left",
        borderBottom: "2px solid #ddd"
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
        fontSize: "15px",
        border: "1px solid #ddd"
    },
    deleteButton: {
        backgroundColor: "#c0392b",
        color: "#fff",
        border: "none",
        padding: "6px 10px",
        borderRadius: "5px",
        cursor: "pointer"
    },
    filterContainer: {
        marginBottom: "15px",
        display: "flex",
        justifyContent: "space-between", // Align labels and inputs in one row with space between
        alignItems: "center"
    },
    filterInput: {
        padding: "8px",
        fontSize: "16px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        width: "200px"
    }
};

export default TaskList;
