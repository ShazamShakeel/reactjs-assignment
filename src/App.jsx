import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardBody, Col, Container, Row, Stack } from "react-bootstrap";
import ComponentOptions from "./components/ComponentOptions";
import AsideContent from "./components/AsideContent";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import MainContainer from "./components/MainContainer";
import { useEffect, useState } from "react";
import DataContent from "./components/DataContent";
import Image from "./components/Image";
import Chat from "./components/Chat";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import ContextProvider from "./context/ContextProvider";
import AppActionButtons from "./components/AppActionButtons";

function App() {
  const [componentOrder, setComponentOrder] = useState([
    "data-content",
    "image-content",
    "chat-content",
  ]);
  const [components, setComponents] = useState([null, null, null]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setComponentOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  useEffect(() => {
    const _components = componentOrder.map((id) => {
      switch (id) {
        case "data-content":
          return <DataContent />;
        case "image-content":
          return <Image />;
        case "chat-content":
          return <Chat />;
        default:
          return null;
      }
    });
    setComponents(_components);
  }, [componentOrder]);

  return (
    <ContextProvider>
      <Stack
        direction="vertical"
        gap={2}
        className="align-items-end p-3"
        style={{ height: "100dvh", maxHeight: "100vh" }}
      >
        <Card className="py-2 bg-light w-100" style={{ height: "100%" }}>
          <CardBody>
            <Container fluid style={{ height: "100%" }}>
              <Row className="gx-0" style={{ height: "100%" }}>
                <Col xs={2}>
                  <Stack
                    direction="vertical"
                    gap={2}
                    className="h-100 border rounded bg-white p-2"
                  >
                    <ComponentOptions />
                    <AppActionButtons />
                  </Stack>
                </Col>
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                  <SortableContext items={componentOrder}>
                    <Col xs={6}>
                      <MainContainer component={components[0]} />
                    </Col>
                    <Col xs={4} className="h-100">
                      <AsideContent
                        topComponent={components[1]}
                        bottomComponent={components[2]}
                      />
                    </Col>
                  </SortableContext>
                </DndContext>
              </Row>
            </Container>
          </CardBody>
        </Card>
      </Stack>
    </ContextProvider>
  );
}

export default App;
