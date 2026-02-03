import Todo_list from "../models/todo.js";

export const addTodos= async(req,res)=>{
    const {name, status, duedate}= req.body;
    const todoList = new Todo_list({
        name,
        status,
        duedate
    });
     const savedTodo = await todoList.save();
    res.status(201).json(savedTodo);
   
}


export const getTodos= async(req,res)=>{
    const todos= await Todo_list.find();
    res.status(200).json(todos);
}

export const updateTodos=async(req,res)=>{
    const {id}=req.params;
    const {name,status,duedate}=req.body;


    const updatedTodo=await Todo_list.findByIdAndUpdate(
        id,
        {name,status,duedate},
        {new: true , runValidators: true}
    );

    if(!updatedTodo){
        return res.status(404).json({message: "Todo not found"});
    }
    res.status(200).json(updatedTodo);
}

export const deleteTodo=async(req,res)=>{
    const {id}=req.params;
    const deletedTodo= await Todo_list.findByIdAndDelete(id);

    if(!deletedTodo){
        return res.status(404).json({message: "Todo not found"});
    }
    res.status(200).json({message: "Todo deleted successfully"});
}