const BASE_URL="http://localhost:8080/tasks"

export async function fetchTasks(params) {
    const response=await fetch(BASE_URL);
    if(!response.ok){
        throw new Error("Failed to fetch tasks");
    }
    return await response.json();
    
}

export async function createTask(task) {
    const response=await fetch(BASE_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(task)
    });

    if(!response.ok){
        throw new Error("Failed to create task");
    }
    return await response.json();
}
export async function updateTask(id,updatedTask) {
    const response=await fetch(`${BASE_URL}/${id}`,{
        method:"PUT",
        header:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(updatedTask)
    });

    if(!response.ok){
        throw new Error("Failed to update task");
    }
    return await response.json();
}
export async function deleteTask(id){
    const response=await fetch(`${BASE_URL}/${id}`,{
        method:"DELETE"
    });
    if(!response.ok){
        throw new Error("Failed to delete task");
    }
}
