import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import userEvent from "@testing-library/user-event";

const sampleTodos = [
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

const setup = () => {
  const onRemove = jest.fn();
  const handleCheckBox = jest.fn();
  const utils = render(
    <TodoList
      todos={sampleTodos}
      onRemove={onRemove}
      handleCheckBox={handleCheckBox}
    />
  );

  return {
    ...utils,
    onRemove,
    handleCheckBox,
  };
};

test("renders todos properly", () => {
  setup();
  screen.getByText(sampleTodos[0].text);
  screen.getByText(sampleTodos[1].text);
});

test("calls onRemove", async () => {
  const user = userEvent.setup();
  const { onRemove } = setup();

  await user.click(screen.getAllByText("삭제")[0]);
  expect(onRemove).toBeCalledWith(sampleTodos[0].id);
});

test("calls handleCheckBox", async () => {
  const user = userEvent.setup();
  const { handleCheckBox } = setup();
  await user.click(screen.getByLabelText("TODO-TDD", { selector: "input" }));
  expect(handleCheckBox).toBeCalledWith(
    sampleTodos[0].id,
    !sampleTodos[0].done
  );
});
