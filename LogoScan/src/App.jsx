import { Route, Routes } from "react-router-dom";
import CameraPage from "./pages/CameraPage";
import GalleryPage from "./pages/GalleryPage";

function App() {
    return (
        <Routes>
          <Route path="/" element={<CameraPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
    );
}

export default App;