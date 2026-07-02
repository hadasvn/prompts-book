import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./screens/Home.jsx";
import Profile from "./screens/Profile.jsx";
import PromptEditor from "./screens/PromptEditor.jsx";
import Analyze from "./screens/Analyze.jsx";
import Library from "./screens/Library.jsx";
import Settings from "./screens/Settings.jsx";
import AccessibilityStatement from "./screens/AccessibilityStatement.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="prompt/:id" element={<PromptEditor />} />
        <Route path="analyze" element={<Analyze />} />
        <Route path="library" element={<Library />} />
        <Route path="settings" element={<Settings />} />
        <Route path="accessibility" element={<AccessibilityStatement />} />
      </Route>
    </Routes>
  );
}

export default App;
