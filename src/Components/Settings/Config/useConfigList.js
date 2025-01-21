// useConfigList.js
import { useState, useEffect } from "react";
import { message } from "antd";
import { Instance } from "../../../AxiosConfig";

export const useConfigList = () => {
    const [configs, setConfigs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchConfigs = async () => {
        setLoading(true);
        try {
            const response = await Instance.get(`/config`);
            setConfigs(response.data || []);
        } catch (error) {
            message.error("Failed to fetch configurations.");
            console.error("Error fetching configs:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteConfig = async (id) => {
        setLoading(true);
        try {
            // Updated DELETE request to match the API endpoint
            await Instance.delete(`/config/${id}`);
            message.success("Configuration deleted successfully.");
            fetchConfigs();
        } catch (error) {
            message.error("Failed to delete configuration.");
            console.error("Error deleting config:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfigs();
    }, []);

    return { configs, loading, fetchConfigs, deleteConfig };
};
