#ifndef SENSOR_DATA_H
#define SENSOR_DATA_H

#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* authToken = "Bearer YOUR_AUTH_TOKEN";

//Function declaration
int getLatestSensorData(String projectName, String sensorName, int userId);
void sendSensorData(String projectName, String sensorName, int userId, int value);
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
