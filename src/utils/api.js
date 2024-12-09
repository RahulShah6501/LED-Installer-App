import axios from "axios";

export const getEquipmentData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/equipment");
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment data", error);
    throw error;
  }
};
