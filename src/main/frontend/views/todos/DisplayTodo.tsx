import { HorizontalLayout } from "@vaadin/react-components/HorizontalLayout.js";
import { VerticalLayout } from "@vaadin/react-components/VerticalLayout.js";
import { Button } from "@vaadin/react-components/Button.js";
import { Icon } from "@vaadin/react-components/Icon.js";

import Todo from "Frontend/generated/com/genaihackathon/aiwasps/model/Todo";
import { useNavigate } from "react-router-dom";

import "./DisplayTodo.css";
import { useEffect, useState } from "react";

interface DisplayTodoProps {
  todo: Todo;
  onClick: (todo: Todo) => void;
  highlight?: boolean;
}

export const DisplayTodo = ({ todo, onClick }: DisplayTodoProps) => {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(getAvatar(todo.avatarUrl));

  useEffect(() => {
    if (!todo.avatarUrl) {
      return;
    }
    setAvatar(getAvatar(todo.avatarUrl));
  }, [todo.avatarUrl]);

  return (
    <VerticalLayout theme="spacing margin" className="card">
      <HorizontalLayout
        theme="spacing"
        className="bg-red-50 border-l-4 border-red-500"
      >
        {avatar}

        <VerticalLayout theme="spacing" className="fullWidth">
          <h3>
            <b>
              {todo.person.firstName} {todo.person.lastName}
            </b>
          </h3>
          <h4>
            <b>
              <span>{todo.action.title}</span>
            </b>
          </h4>

          <p className="textWidth">{todo.action.description}</p>
        </VerticalLayout>
      </HorizontalLayout>

      <HorizontalLayout
        theme="spacing"
        style={{ width: "100%", justifyContent: "flex-end" }}
      >
        <Button aria-label="Summary" onClick={() => onClick(todo)}>
          <Icon icon="vaadin:envelope" /> Open
        </Button>
        <Button
          theme="primary"
          aria-label="Summary"
          onClick={() => {
            localStorage.clear();
            localStorage.setItem("todo", JSON.stringify(todo));
            navigate("/mail");
          }}
        >
          <Icon icon="vaadin:reply" /> Respond
        </Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
};
function getAvatar(avatarUrl: string | undefined) {
  if (!avatarUrl) {
    return (
      <img
        src="/images/base-avatar.jpeg"
        style={{
          width: "100px",
          height: "100px",
          clipPath: "circle(45%)",
        }}
      />
    );
  } else {
    return (
      <img
        className="avatar"
        src={`data:image/png;base64, ${avatarUrl}`}
        style={{
          width: "100px",
          height: "100px",
          clipPath: "circle(45%)",
        }}
      />
    );
  }
}
