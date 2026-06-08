import type { TaskModel } from "../models/taskModel";

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if(task.completeDate) return 'Completa'
  if(task.interruptedDate) return 'Interrompida'
  if(activeTask?.id === task.id) return 'Em andamento'
  return 'Abandonada'
}
