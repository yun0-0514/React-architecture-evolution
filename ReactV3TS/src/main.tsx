import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";

const container = document.getElementById("root");
if (!container) {
  throw new Error("root요소를 찾을 수 없습니다. index,html 확인 필요");
}
const root = createRoot(container);
root.render(<App />);
