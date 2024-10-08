import { useCallback, useEffect, useState } from "react";
import { DisplayTodo } from "./DisplayTodo";
import Todo from "Frontend/generated/com/genaihackathon/aiwasps/model/Todo";
import { AvatarService, TodoService } from "Frontend/generated/endpoints";
import { Dialog } from "@vaadin/react-components/Dialog.js";
import Avatar from "Frontend/generated/com/genaihackathon/aiwasps/model/Avatar";

import "./TodosView.css";

export default function ContactsView() {
  const [todos, setTodos] = useState<Todo[]>();
  const [error, setError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messageSummary, setMessageSummary] = useState<string>();
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);

  const loadTodos = useCallback(async () => {
    let todos: Todo[] = [];
    try {
      todos = await TodoService.getAll();
    } catch (e) {
      setError(true);
      return;
    }

    setTodos(todos);
    const mostImportantTodos = todos.slice(0, 3);

    const requests = mostImportantTodos.map(({ gender, emotions }) =>
      AvatarService.getAvatarAsBase64(gender, emotions)
    );

    let mostImportantImages: Avatar[] = [];
    try {
      mostImportantImages = await Promise.all(requests);
    } catch (e) {
      return;
    }

    setAvatarUrls(mostImportantImages.map((i) => i.imageAsBase64));
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <Dialog
        header-title="Request message summary"
        opened={isDialogOpen}
        onOpenedChanged={(event) => {
          setIsDialogOpen(event.detail.value);
        }}
      >
        <p style={{ width: "50rem", whiteSpace: "pre-wrap" }}>
          {messageSummary}
        </p>
      </Dialog>

      {!todos && (
        <h2
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {error
            ? "Todos could not be loaded! Something went wrong..."
            : "Loading..."}
        </h2>
      )}

      <div className="todoList">
        {todos?.map((todo, index) => (
          <DisplayTodo
            key={todo.person.firstName + todo.person.lastName +
              todo.action.title}
            todo={index <= 2
              ? { ...todo, avatarUrl: avatarUrls?.at(index) }
              : todo}
            onClick={(todo) => {
              setMessageSummary(todo.originalMessage);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>
    </>
  );
}
