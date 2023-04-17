import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "../components/TodoApp";

describe("<TodoApp/>", () => {
  it("renders TodoForm and TodoList", () => {
    render(<TodoApp />);
    screen.getByText("등록하기");
    screen.getByTestId("TodoList");
  });

  it("renders two defaults todos", () => {
    render(<TodoApp />);
    screen.getByText("TODO-TDD");
    screen.getByText("velog 작성하기");
  });

  it("create new todo", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    const button = screen.getByText("등록하기");
    await user.click(input);
    await user.paste("테스트 할일");
    await user.click(button);
    screen.getByText("테스트 할일");
  });

  it("checkbox todo", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    const input = screen.getByLabelText("TODO-TDD", { selector: "input" });
    const label = screen.getByText("TODO-TDD");
    expect(label).toHaveStyle("text-decoration: line-through;");
    await user.click(input);
    expect(label).not.toHaveStyle("text-decoration: line-through;");
    await user.click(input);
  });

  it("remove todo", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    const todoText = screen.getByText("TODO-TDD");
    await user.click(screen.getAllByText("삭제")[0]);
    expect(todoText).not.toBeInTheDocument();
  });
});
