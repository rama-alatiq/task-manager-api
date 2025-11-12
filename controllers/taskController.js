import Task from "../models/task.js";

//POST route
export async function createTask(request, response) {
  try {
    const { title, description, priority, dueDate } = request.body;
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: request.user.id,
    });
    response.status(201).json(task);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

//GET route
export async function getAllTasks(request, response) {
  try {
    const tasks = await Task.findAll({
      where: { userId: request.user.id },
    });

    response.status(200).json(tasks);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

//GET route by ID
export async function getTaskById(request, response) {
  try {
    const task = await Task.findOne({
      where: { id: request.params.id, userId: request.user.id },
    });
    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }
    response.status(200).json(task);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

export async function deleteTaskById(request, response) {
  try {
    const task = await Task.findOne({
      where: {
        id: request.params.id,
        userId: request.user.id, // Ensure we only find a task belonging to this user
      },
    });

    if (!task) {
      return response.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    response.status(204).send();
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
