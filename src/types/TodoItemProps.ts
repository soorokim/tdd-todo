import { TodoProps } from "./TodoProps";

export interface TodoItemProps extends TodoProps {
  onRemove: (id: number) => void;
  handleCheckBox: (id: number, done: boolean) => void;
}
