import React from "react";
import Loading from "./Loading";

const ImagePreview = ({ loading, enhanced, upload }) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Original Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
                    Original Image
                </h2>
                {upload ? (
                    <img src={upload} alt="" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-80 bg-gray-200 text-gray-500">
                        No image selected
                    </div>
                )}
            </div>

            {/* Enhanced Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <h2 className="text-xl font-semibold text-center bg-blue-600 text-white py-2">
                    Enhanced Image
                </h2>
                {loading ? (
                    <Loading />
                ) : enhanced ? (
                    <img src={enhanced} alt="" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-80 bg-gray-200 text-gray-500">
                        Upload an image to enhance
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;
