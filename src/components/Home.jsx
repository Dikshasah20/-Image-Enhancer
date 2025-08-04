import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { enhancedImageAPI } from "./../utils/enhanceImage";

async function resizeImage(file, maxWidth = 1024, maxHeight = 1024, quality = 0.2) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (event) => {
        img.src = event.target.result;
      };
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
  
        // Maintain aspect ratio while resizing
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          "image/jpeg",
          quality
        );
      };
  
      img.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
  
const Home = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadImageHandler = async (image) => {
        setUploadImage(URL.createObjectURL(image));
        setLoading(true);

        try {
            console.log("Original Image: ", image);
            
            const resizedImage = await resizeImage(image);
            console.log("Resized Image: ", resizedImage);
            
            const enhancedURL = await enhancedImageAPI(resizedImage);
            
            setEnhancedImage(enhancedURL);
            
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Error while enhancing the image. Please try again later.");
        }
    };
   
    console.log("Enhanced Image data: ", enhancedImage);

    return (
        <>
            <ImageUpload uploadImageHandler={uploadImageHandler} />
            <ImagePreview loading={loading} enhanced={enhancedImage?.image} upload={uploadImage} />
        </>
    );
};

export default Home;
