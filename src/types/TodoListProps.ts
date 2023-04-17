import { Todo } from "./TodoProps";

export interface TodoListProps {
  todos: Todo[];
  onRemove: (id: number) => void;
  handleCheckBox: (id: number, done: boolean) => void;
}
