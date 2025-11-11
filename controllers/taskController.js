import Task from "../models/task.js";

//POST route
export async function createTask(request, response) {
  try {
    const { title, description, priority, dueDate } = request.body;
    const task = await Task.create({ title, description, priority, dueDate });
    response.status(201).json(task);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

//GET route
export async function getAllTasks(request, response) {
  try {
    const tasks = await Task.findAll();
    response.status(200).json(tasks);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

//GET route by ID
export async function getTaskById(request, response) {
  try {
    const task = await Task.findByPk(request.params.id);
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    response.status(200).json(task);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}


export async function deleteTaskById(request,response){
  try {
    const idToDelete = request.params.id;

    // --- Start Debugging ---
    console.log(`Attempting to delete task with ID: ${idToDelete}`);
    const allTasksInDB = await Task.findAll({ attributes: ['id', 'title'] });
    console.log('Current tasks in the database:', JSON.stringify(allTasksInDB, null, 2));
    // --- End Debugging ---

    const task = await Task.findByPk(idToDelete);

    if (!task) {
      console.log(`Task with ID ${idToDelete} was not found.`);
      return response.status(404).json({message:"Task not found"});
    }
    await task.destroy();
    response.status(204).send();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
