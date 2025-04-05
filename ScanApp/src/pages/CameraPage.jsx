import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { MdFlipCameraAndroid } from "react-icons/md";
import { BiImages } from "react-icons/bi";

const CameraPage = () => {
    const webcamRef = useRef(null);
    const [facing, setFacing] = useState("environment");
    const navigate = useNavigate();

    const videoConstraints = {
        facingMode: facing,
        width: window.innerWidth,
        height: window.innerHeight,
    };

    const toggleFacingMode = () => {
        setFacing((prev) => (prev === "user" ? "environment" : "user"));
        console.log(facing);
    }

    const saveToPhotoMemo = async (image) => {
        const base64String = image.split(",")[1];
        try {
            const response = await fetch("http://localhost:3500/save_img", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: base64String }),
            });
        
            if (!response.ok) {
                throw new Error("Failed to save image to photo memo");
            }
        
            console.log("Image saved successfully");
        } catch (err) {
            console.error("Error saving image:", err);
        }
    };

    const captureImage = async () => {
        if (webcamRef.current) {
        const screenshot = webcamRef.current.getScreenshot();
        const processed = await invertFrame(screenshot);
        await saveToPhotoMemo(processed);
        }
    };

    const invertFrame = async (frame) => {
        if (frame == null) {
        return;
        }
        
        const base64String = frame.split(",")[1];
        const response = await fetch("http://localhost:3500/invert_image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: base64String }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        // Process recieved data
        let data = await response.json(); 
        frame = "data:image/jpeg;base64," + data.substring(data.indexOf(":") + 3, data.length - 2);

        return frame;
    };

    return (
        <div className="relative h-screen w-screen bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="object-cover w-full h-full transform scale-x-[-1]"
                />
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10 h-[150px] bg-black/60 px-2 flex items-center justify-center">
                <div className="flex items-center justify-center w-full max-w-md">
                <button className="absolute left-[15%] text-white opacity-70 hover:opacity-100" onClick={() => navigate("/gallery")}>
                    <BiImages size={30} />
                </button>
                <button
                    onClick={captureImage}
                    className="w-18 h-18 rounded-full bg-gray-500/50 active:scale-90 transition-all border-gray-400 border-3"
                />
                <button className="absolute right-[15%] text-white opacity-70 hover:opacity-100" onClick={toggleFacingMode}>
                    <MdFlipCameraAndroid size={30} />
                </button>
                </div>
            </div>
        </div>
    );
};

export default CameraPage;
