import { Route, Routes } from "react-router-dom";
import CameraPage from "./CameraPage";
import GalleryPage from "./GalleryPage";

function App() {
    return (
        <Routes>
          <Route path="/" element={<CameraPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
    );
}

export default App;