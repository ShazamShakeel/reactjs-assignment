import { Stack } from "react-bootstrap";

function ComponentOptions() {
  return (
    <Stack gap={2} className="h-100 border rounded bg-white py-2">
      <div className="mx-2 p-1 border rounded text-center bg-secondary text-white font-weight-bold">
        Options
      </div>

      <div className="mx-2 p-1 border rounded">Option 1</div>
      <div className="mx-2 p-1 border rounded">Option 2</div>
      <div className="mx-2 p-1 border rounded">Option 3</div>
    </Stack>
  );
}

export default ComponentOptions;
