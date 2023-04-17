import { TodoListProps } from "../types/TodoListProps";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onRemove, handleCheckBox }: TodoListProps) => {
  return (
    <ul data-testid="TodoList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          handleCheckBox={handleCheckBox}
        />
      ))}
    </ul>
  );
};

export default TodoList;
