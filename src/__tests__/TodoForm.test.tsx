import { render, screen } from "@testing-library/react";
import TodoForm from "../components/TodoForm";
import userEvent from "@testing-library/user-event";

const INPUT_TEST_VALUE = "TDD-TODO";

const setup = () => {
  const onInsert = jest.fn();
  const utils = render(<TodoForm onInsert={onInsert} />);
  const input = screen.getByPlaceholderText("할 일을 입력하세요");
  const button = screen.getByText("등록하기");
  return {
    ...utils,
    input,
    button,
    onInsert,
  };
};

test("has input and a button", () => {
  const { input, button } = setup();
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("changes input", async () => {
  const user = userEvent.setup();
  const { input } = setup();
  await user.type(input, INPUT_TEST_VALUE);

  expect(input).toHaveAttribute("value", INPUT_TEST_VALUE);
});

test("calls onInsert and clears input", async () => {
  const user = userEvent.setup();
  const { input, button, onInsert } = setup();

  await user.type(input, INPUT_TEST_VALUE);
  await userEvent.click(button);

  expect(onInsert).toBeCalledWith(INPUT_TEST_VALUE);
  expect(input).toHaveAttribute("value", "");
});
