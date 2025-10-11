
// Todo UI

/*
Marked "use client" at top → ensures isolated hydration.
No server–client mismatch, because Home renders only static markup and <Todo /> hydrates separately.
*/

"use client"
import { useEffect,useState } from "react";
import Loading from "./loading";

interface Todo{
    id:number;
    title:string;
    completed:boolean;
}

export default function Todo(){
    const [todos,setTodos] = useState<Todo[]>([]);
    const [newTitle,setNewTitle] = useState("");
    const [editId,setEditId] = useState<number|null>(null);
    const [editTitle,setEditTitle] = useState("");
    const [loading,setLoading] = useState(true);


    // Fetch todo
    async function fetchTodos(){
        const res = await fetch("/api/todos");
        const data = await res.json();
        setTodos(data);    
        setLoading(false);
    }

    useEffect(()=>{
        fetchTodos();
    },[]);

    // if(loading) return (<Loading/>);



    // Create todo
    async function addTodo(){
        if(!newTitle.trim()) return; 
        
        await fetch("/api/todos",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title:newTitle})
        });
        setNewTitle("");
        fetchTodos();
    }


    // Update todo
    async function updateTodo(id:number){
        if(!editTitle.trim()) return;
        await fetch("/api/todos/"+id,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title:editTitle})
        });
        setEditId(null);
        fetchTodos();
    }


    // Delete todo
    async function deleteTodo(id:number){
        await fetch(`/api/todos/${id}`,{
            method:"DELETE"
        });
        fetchTodos();
    }

    return (
        <div style={{ padding:20 }}>
                <h2>📝 Todo List</h2>

                {/* Add new todo */}
                <div>
                    <input type="text" value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="New task..."/>
                    <button type="button" onClick={addTodo}>Add</button>
                </div>

                {/* List todos */}
                <ul>
                    {
                        todos.map((todo)=>(
                            <li key={todo.id}>
                                {
                                editId === todo.id
                                ?
                                (
                                    <>
                                        <input type="text" value={editTitle} onChange={e=>setEditTitle(e.target.value)}/>
                                        <button type="button" onClick={()=>updateTodo(todo.id)}>Save</button>
                                        <button type="button" onClick={()=>setEditId(null)}>Cancel</button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <span>{todo.title}</span>
                                        <button type="button" onClick={()=>{
                                            setEditId(todo.id)
                                            setEditTitle(todo.title)
                                        }}>Edit
                                        </button>
                                        <button type="button" onClick={()=>deleteTodo(todo.id)}>Delete</button>
                                    </>
                                )
                                }
                            </li>
                        ))
                    }
                </ul>

        </div>
    );
}