#include "WiFiSetup.h"
#include "SensorData.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// Define project-specific details
const int userId = 1;                // Replace with actual user ID
String projectName = "ProjectName";  // Replace with actual project name
String sensorName = "SensorName";    // Replace with actual sensor name

// YOUR SENSOR AND VARIABLE DECLARATIONS HERE

void setup() {
    Serial.begin(115200);

    // YOUR SENSOR PINMODE DECLARATION & INITIALIZATION CODE HERE
    
    connectToWiFi(); // Connect to Wi-Fi
}

void loop() {
    // YOUR SENSOR DATA READING CODE HERE

    // Send sensor data to the cloud
    sendSensorData(projectName, sensorName, userId, sensorData);

    // Get latest sensor data from the cloud
    getLatestSensorData(projectName, sensorName, userId);

    delay(5000); // Set the delay as per your requirement
}
