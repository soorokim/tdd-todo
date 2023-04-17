import {
  fireEvent,
  getByLabelText,
  render,
  screen,
} from "@testing-library/react";
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

  it("create new todo", () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    const button = screen.getByText("등록하기");
    fireEvent.change(input, {
      target: {
        value: "테스트 할일",
      },
    });
    fireEvent.click(button);
    screen.getByText("테스트 할일");
  });

  it("checkbox todo", () => {
    render(<TodoApp />);
    const input = screen.getByLabelText("TODO-TDD", { selector: "input" });
    const label = screen.getByText("TODO-TDD");
    expect(label).toHaveStyle("text-decoration: line-through;");
    fireEvent.click(input);
    expect(label).not.toHaveStyle("text-decorator: line-through;");
    fireEvent.click(input);
  });

  it("remove todo", () => {
    render(<TodoApp />);
    const todoText = screen.getByText("TODO-TDD");
    fireEvent.click(screen.getAllByText("삭제")[0]);
    expect(todoText).not.toBeInTheDocument();
  });
});
