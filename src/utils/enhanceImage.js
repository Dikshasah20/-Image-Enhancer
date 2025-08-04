import axios from "axios";

const API_KEY = "wxbxowkfcgxxcp1v9";
const BASE_URL = "https://techhk.aoscdn.com/";
const MAX_RETRIES = 30;  // Allow more retries
const RETRY_INTERVAL = 5000;  // Wait 5 seconds instead of 2

export const enhancedImageAPI = async (file)=>{
    try {
        const taskId = await uploadImage(file);
        console.log("Image uploaded successfully. Task ID:", taskId);

        const enhancedImageData = await pollingEnhancedImage(taskId);
        console.log("Enhanced Image Data : ",enhancedImageData);
                
        return enhancedImageData;
    } catch (error) {
        console.log("Error enhancing image:",error.message);
        
    }
}

const uploadImage = async (file)=>{
    const formData = new FormData();
    formData.append("image_file", file);
    const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`,formData,{
        headers:{
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY,
        },
    })
    if(!data?.data?.task_id){
        throw new Error("No task ID received from the server.");
    }
    return data.data.task_id;
    
}
// task_id: '1169b526-6f1a-4a7c-8ddb-395f79ae5dae'
const fetchEnhancedImage = async(taskId)=>{
    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`,{
        headers:{
            
            "X-API-KEY": API_KEY,
        },
    })
    console.log("Data from fetchEnhancedImage:",data);
    return data.data;
}

const pollingEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);
   
    if(result.state === 4){
        console.log("Processing...");
        if(retries >= 20){
            throw new Error("Max retries reached. Image processing failed.");
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return  pollingEnhancedImage(taskId, retries + 1);
    }
    console.log("Image processing completed. Result:", result);
    return result;
    
}