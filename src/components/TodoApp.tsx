import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "../types/TodoProps";

const TodoApp = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const onInsert = (value: string) => {
    setTodos((prev) => [
      ...prev,
      { id: prev.slice(-1)[0].id + 1, text: value, done: false },
    ]);
  };
  const onRemove = (removeId: number) => {
    setTodos((prev) => prev.filter(({ id }) => removeId !== id));
  };
  const handleCheckBox = (id: number, done: boolean) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
  };

  useEffect(() => {
    const data = [
      {
        id: 1,
        text: "TODO-TDD",
        done: true,
      },
      {
        id: 2,
        text: "velog 작성하기",
        done: true,
      },
    ];
    setTodos(data);
  }, []);

  return (
    <div>
      <TodoForm data-testid="helloworld" onInsert={onInsert} />
      <TodoList
        todos={todos}
        onRemove={onRemove}
        handleCheckBox={handleCheckBox}
      />
    </div>
  );
};

export default TodoApp;
