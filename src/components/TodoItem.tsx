import styled from "styled-components";
import { TodoItemProps } from "../types/TodoItemProps";

interface LabelProps {
  checked: boolean;
}

const TodoItem = ({ todo, onRemove, handleCheckBox }: TodoItemProps) => {
  const { text, done, id } = todo;

  const handleRemoveButton = () => {
    onRemove(id);
  };

  return (
    <li>
      <input
        id={text}
        type="checkbox"
        checked={done}
        readOnly
        onChange={() => handleCheckBox(id, !done)}
      />
      <Label checked={done} htmlFor={text}>
        {text}
      </Label>
      <button type="button" onClick={handleRemoveButton}>
        삭제
      </button>
    </li>
  );
};

const Label = styled.label<LabelProps>`
  ${({ checked }) => checked && "text-decoration: line-through"}
`;
export default TodoItem;
