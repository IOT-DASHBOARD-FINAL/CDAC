export const esp32_SensorData = `#ifndef SENSOR_DATA_H
#define SENSOR_DATA_H

#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* authToken = "Bearer YOUR_AUTH_TOKEN";

/**
 * Fetches the latest sensor data from the API
 * @param sensorName The sensor name
 * @param projectName The project name
 * @param userId The user ID
 * @return Latest sensor value (0 or 1), -1 if an error occurs
 */
int getLatestSensorData(String projectName, String sensorName, int userId) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi Disconnected!");
        return -1;
    }

    String serverUrl = "https://iot-application-backend.onrender.com/api/projects/" + 
                        projectName + "/sensor/" + sensorName + "/getValue";

    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", authToken);

    StaticJsonDocument<200> requestBody;
    requestBody["id"] = userId;
    
    String requestData;
    serializeJson(requestBody, requestData);

    int httpResponseCode = http.POST(requestData);
    int sensorValue = -1; // Default to -1 if no valid response

    if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("Response: " + response);

        DynamicJsonDocument jsonDoc(4096);
        DeserializationError error = deserializeJson(jsonDoc, response);
        
        if (!error && jsonDoc["data"].size() > 0) {
            int lastIndex = jsonDoc["data"].size() - 1;
            sensorValue = jsonDoc["data"][lastIndex]["value"];
            Serial.print("Latest Sensor Value: ");
            Serial.println(sensorValue);
        } else {
            if(error) {
                Serial.print("Deserialization Error: ");
                Serial.println(error.c_str());
            }
            else Serial.println("Invalid JSON response or no sensor data.");
        }
    } else {
        Serial.print("HTTP Error: ");
        Serial.println(httpResponseCode);
    }

    http.end();
    return sensorValue;
}

/**
 * Sends sensor state data to the API
 * @param sensorName The sensor name
 * @param projectName The project name
 * @param userId The user ID
 * @param value The value to be sent (0 or 1)
 */
void sendSensorData(String projectName, String sensorName, int userId, int value) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi Disconnected! Cannot send data.");
        return;
    }

    String serverUrl = "https://iot-application-backend.onrender.com/api/projects/" + 
                        projectName + "/sensor/" + sensorName + "/sendValue";

    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", authToken);

    StaticJsonDocument<200> requestBody;
    requestBody["id"] = userId;
    requestBody["value"] = value;
    
    String requestData;
    serializeJson(requestBody, requestData);

    int httpResponseCode = http.POST(requestData);

    if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("Data Sent Successfully: " + response);
    } else {
        Serial.print("Error Sending Data: ");
        Serial.println(httpResponseCode);
    }

    http.end();
}

#endif
`

export const RaspberryPi_SensorData =  `import requests
import json

# Authentication Token
AUTH_TOKEN = "Bearer YOUR_AUTH_TOKEN"

# API Base URL
BASE_URL = "https://iot-application-backend.onrender.com/api/projects"

def get_latest_sensor_data(project_name, sensor_name, user_id):
    """
    Fetches the latest sensor data from the API.

    :param project_name: The project name
    :param sensor_name: The sensor name
    :param user_id: The user ID
    :return: Latest sensor value (0 or 1), -1 if an error occurs
    """
    url = f"{BASE_URL}/{project_name}/sensor/{sensor_name}/getValue"
    headers = {
        "Content-Type": "application/json",
        "Authorization": AUTH_TOKEN
    }
    
    payload = {"id": user_id}

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()  # Raise an error for bad HTTP status codes
        data = response.json()

        if "data" in data and len(data["data"]) > 0:
            latest_value = data["data"][-1]["value"]
            print(f"Latest Sensor Value: {latest_value}")
            return latest_value
        else:
            print("Invalid JSON response or no sensor data.")
            return -1
    except requests.exceptions.RequestException as e:
        print(f"HTTP Request Error: {e}")
        return -1

def send_sensor_data(project_name, sensor_name, user_id, value):
    """
    Sends sensor state data to the API.

    :param project_name: The project name
    :param sensor_name: The sensor name
    :param user_id: The user ID
    :param value: The value to be sent (0 or 1)
    """
    url = f"{BASE_URL}/{project_name}/sensor/{sensor_name}/sendValue"
    headers = {
        "Content-Type": "application/json",
        "Authorization": AUTH_TOKEN
    }
    
    payload = {
        "id": user_id,
        "value": value
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        print(f"Data Sent Successfully: {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"Error Sending Data: {e}")
`