import React, { useEffect, useState } from "react";
import { HorizontalLayout } from "@vaadin/react-components/HorizontalLayout.js";
import { VerticalLayout } from "@vaadin/react-components/VerticalLayout.js";
import { Item, ListBox, TextArea } from "@vaadin/react-components";
import { useParams } from "react-router-dom";

export default function () {
  const { name } = useParams();
  const [selectedValues, setSelectedValues] = useState<Array<number>>([]);
  const [ListBoxItems, setListBoxItems] = useState<Array<string>>([]);

  useEffect(() => {
    console.log(name);
    if (name === "mail") {
      setListBoxItems(["Mail checked", "Mail refined", "Mail send"]);
      setTimeout(() => setSelectedValues([0]), 500);
      setTimeout(() => setSelectedValues([0, 1]), 1350);
      setTimeout(() => setSelectedValues([0, 1, 2]), 2050);
    }
  }, [name]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <VerticalLayout theme="spacing padding">
        <HorizontalLayout theme="spacing" style={{ alignItems: "baseline" }}>
          <ListBox multiple selectedValues={selectedValues}>
            {ListBoxItems.map((item, index) => (
              <Item key={index}>{item}</Item>
            ))}
          </ListBox>
        </HorizontalLayout>
      </VerticalLayout>
    </div>
  );
}
