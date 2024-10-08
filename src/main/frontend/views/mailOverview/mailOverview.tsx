import { HorizontalLayout } from "@vaadin/react-components/HorizontalLayout.js";
import { VerticalLayout } from "@vaadin/react-components/VerticalLayout.js";
import { TextField } from "@vaadin/react-components/TextField";
import { TextArea } from "@vaadin/react-components/TextArea";
import { Button } from "@vaadin/react-components/Button.js";
import { EmailReplyService } from "Frontend/generated/endpoints";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Todo from "Frontend/generated/com/genaihackathon/aiwasps/model/Todo";
import { Icon } from "@vaadin/react-components/Icon";

export default function MailOverview() {
  const navigate = useNavigate();

  const [mail, setMail] = useState<string>("");
  const [politenessLevel, setPolitenessLevel] = useState<string>("3");
  const [todo, setTodo] = useState<Todo | undefined>();
  const [subject, setSubject] = useState<string>("");

  useEffect(() => {
    const currentTodo = localStorage.getItem("todo");
    if (currentTodo) {
      const parsed = JSON.parse(currentTodo);
      setTodo(parsed);
      setMail(parsed.followUpMails[0]);
    }
  }, []);
  const onSendClick = async () => {
    navigate("/action/mail");
  };

  const onRegenerateClick = async (email: string) => {
    setMail("");
    EmailReplyService.formulateResponse(email, politenessLevel).onNext(
      (res: string) => {
        console.log("res: ", res);
        return setMail((prev) => prev + res);
      }
    );
  };

  return (
    todo && (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "56px",
        }}
      >
        <VerticalLayout
          theme="spacing margin align-center"
          style={{ width: "60%" }}
        >
          <HorizontalLayout
            theme="spacing"
            style={{
              alignItems: "baseline",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TextField
              placeholder="Subject"
              value={subject}
              onValueChanged={(event) => setSubject(event.detail.value)}
            ></TextField>
            <TextField placeholder="Sth other"></TextField>
          </HorizontalLayout>
          <TextArea
            label="Response suggestion"
            style={{ width: "100%", minHeight: "15rem" }}
            value={mail}
            onValueChanged={(event) => setMail(event.detail.value)}
          />
          <HorizontalLayout
            theme="spacing"
            style={{
              alignItems: "baseline",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              theme="icon"
              onClick={() => onRegenerateClick(todo?.originalMessage)}
            >
              <Icon icon="vaadin:rotate-right" />
              Regenerate
            </Button>
            <Button theme="primary" onClick={() => onSendClick()}>
              <Icon icon="vaadin:arrow-circle-right-o" />
              Send
            </Button>
          </HorizontalLayout>
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h3>Politeness Level </h3>
              <input
                type="range"
                min="1"
                max="5"
                value={politenessLevel}
                onChange={(event) => setPolitenessLevel(event.target.value)}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <img style={{ width: "128px" }} src="/images/pirate.jpg" />
              <img style={{ width: "128px" }} src="/images/queen.jpg" />
            </div>
          </div>
        </VerticalLayout>
      </div>
    )
  );
}
