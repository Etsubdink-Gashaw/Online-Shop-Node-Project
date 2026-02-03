import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    duedate: {
        type: Date,
        required: true,
    },
});

const Todo_list = mongoose.model("Todo_list", todoSchema);
export default Todo_list;