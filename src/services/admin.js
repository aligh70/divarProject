import api from "configs/api";

const addCategory = (data) => api.post("category", data);
const deleteCategory = (id) => api.delete(`category/${id}`);

const getCategory = () => api.get("category");

export { addCategory, getCategory, deleteCategory };
