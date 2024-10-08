import { AppLayout } from "@vaadin/react-components/AppLayout.js";
import Placeholder from "Frontend/components/placeholder/Placeholder.js";
import { Suspense } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@vaadin/react-components/Button";
import { Icon } from "@vaadin/react-components/Icon";

export default function MainLayout() {
  const navigate = useNavigate();
  let location = useLocation();

  const isActionPageVisible =
    location.pathname === "/action/mail" || location.pathname === "/mail";

  return (
    <AppLayout>
      <div
        slot="navbar"
        style={{
          width: "100vw",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className="headline"
          style={{ width: "50%", justifyContent: "start", display: "flex" }}
        >
          <h2 className="text-l m-0">Customer Dashboard</h2>
        </div>
        <div
          style={{
            display: "flex",
            width: "15%",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
        >
          <Button
            theme="icon"
            aria-label="Summary"
            onClick={() =>
              navigate(location.pathname === "/settings" ? "/" : "/settings")
            }
          >
            <Icon
              icon={
                location.pathname === "/settings"
                  ? "vaadin:lines-list"
                  : "vaadin:cogs"
              }
            />
            {location.pathname === "/settings" ? "To-Dos" : "Settings"}
          </Button>
          {isActionPageVisible && (
            <Button
              theme="icon"
              aria-label="Todos"
              onClick={() => navigate("/")}
            >
              <Icon icon={"vaadin:lines-list"} />
              {"To-Dos"}
            </Button>
          )}
        </div>
      </div>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
