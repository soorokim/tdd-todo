import { ChangeEvent, FormEvent, useState } from "react";

interface TodoFormProps {
  onInsert: (value: string) => void;
}

const TodoForm = ({ onInsert }: TodoFormProps) => {
  const [value, setValue] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    onInsert(value);
    e.preventDefault();
    setValue("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={handleInput}
      />
      <button type="submit">등록하기</button>
    </form>
  );
};

export default TodoForm;
