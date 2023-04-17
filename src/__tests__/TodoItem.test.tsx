import { fireEvent, render, screen } from "@testing-library/react";
import { TodoProps } from "../types/TodoProps";
import TodoItem from "../components/TodoItem";

describe("<TodoItem/>", () => {
  const sampleTodo: TodoProps["todo"] = {
    id: 1,
    text: "TDD-TODO",
    done: false,
  };

  const setup = (props = {} as TodoProps) => {
    const onRemove = jest.fn();
    const handleCheckBox = jest.fn();
    const initialProps = { todo: sampleTodo };
    const utils = render(
      <TodoItem
        {...initialProps}
        {...props}
        onRemove={onRemove}
        handleCheckBox={handleCheckBox}
      />
    );
    const todo = props.todo || initialProps.todo;
    const input = screen.getByLabelText(todo.text, { selector: "input" });
    const label = screen.getByText(todo.text);
    const button = screen.getByText("삭제");
    return {
      ...utils,
      input,
      button,
      label,
      onRemove,
      handleCheckBox,
    };
  };

  it("has input, label, button", () => {
    const { input, label, button } = setup();
    expect(input).toBeTruthy();
    expect(input).toHaveAttribute("type", "checkbox");
    expect(label).toBeTruthy();
    expect(button).toBeTruthy();
  });

  // 오잉 그냥 되어버리넹
  it("checkbox changes", () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: true,
      },
    });

    expect(input).toHaveAttribute("value", "true");
  });

  it("dose not show check and line-through when done is false", () => {
    const { input, label } = setup({ todo: { ...sampleTodo, done: false } });

    expect(input).not.toBeChecked();
    expect(label).not.toHaveStyle("text-decoration: line-through");
  });

  it("shows check and line-through when done is true", () => {
    const { input, label } = setup({ todo: { ...sampleTodo, done: true } });

    expect(input).toBeChecked();
    expect(label).toHaveStyle("text-decoration: line-through");
  });

  it("calls onRemove", () => {
    const { button, onRemove } = setup();
    fireEvent.click(button);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });

  it("calls handleCheckBox", () => {
    const { input, handleCheckBox } = setup();
    fireEvent.click(input);
    expect(handleCheckBox).toBeCalledWith(sampleTodo.id, !sampleTodo.done);
  });
});
