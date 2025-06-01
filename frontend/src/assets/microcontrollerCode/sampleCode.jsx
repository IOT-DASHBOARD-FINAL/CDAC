export const esp_SampleCode =`#include "WiFiSetup.h"
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
`

export const python_Samplecode = `import time
from WiFiSetup import connect_to_wifi
from SensorData import send_sensor_data, get_latest_sensor_data

# Define project-specific details
user_id = 1  # Replace with actual user ID
project_name = "ProjectName"  # Replace with actual project name
sensor_name = "SensorName"  # Replace with actual sensor name

# YOUR SENSOR AND VARIABLE DECLARATIONS HERE

def setup():
    print("Initializing...")
    
    # YOUR SENSOR PINMODE DECLARATION & INITIALIZATION CODE HERE
    
    connect_to_wifi()  # Connect to Wi-Fi

def loop():
    while True:
        # YOUR SENSOR DATA READING CODE HERE
        
        # Send sensor data to the cloud
        send_sensor_data(project_name, sensor_name, user_id, sensor_data)

        # Get latest sensor data from the cloud
        get_latest_sensor_data(project_name, sensor_name, user_id)

        time.sleep(5)  # Set the delay as per your requirement

if __name__ == "__main__":
    setup()
    loop()
`
    