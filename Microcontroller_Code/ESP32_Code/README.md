# Microcontroller -ESP32

## Overview
  This folder contains the embedded systems code for ESP32 , which are integral to the IoT application. It  has specific functionalities tailored for real-time sensor data acquisition, processing, and communication.

## PreRequisites
* WiFi-enabled microcontroller (ESP32, ESP8266)
* Internet connection
* Power supply for microcontroller
* Basic knowledge of microcontroller programming(Embedded C)

## Key Files
* `WiFiSetup.h`: Code to connect ESP32 to a WiFi network.
* `SensorData.h`: Retrieves and processes sensor data.
* `ESP32_ExampleCode.ino`: Shows the Example program.
* `ESP32_SampleCode.ino`: Explains the basic syntax to configure with the website.

### Wifi Setup
 * Replace the SSID and Wifi Password for the Wifi Connection.
 * Connect the Wifi  to the ESP32 Microcontroller

### SensorData Communication

``` 
authToken = "Bearer YOUR_AUTH_TOKEN"; 
```  
Replace the `YOUR_AUTH_TOKEN` with your actual token.

```
"https://iot-application-backend.onrender.com/api/projects/" + projectName + "/sensor/" + sensorName + "/getValue";
``` 
 Replace the `projectName` and `sensorName` with your actual project name and sensor. Fetches the latest sensor data from the API.

```
"https://iot-application-backend.onrender.com/api/projects/" + projectName + "/sensor/" + sensorName + "/sendValue"
```
Replace  Replace the `projectName` and `sensorName` with your actual project name and sensor. Sends sensor state data to the API

### Example Code
  To compile and upload this code to your ESP32, use the Arduino IDE with the necessary libraries installed. Select the correct board and port before uploading

### Sample Code for Initial Setup:

* Ensure that your Wifi connection is stable and connected to the ESP32
* Import all the required packages.
* Replace your UserId by reffering in the Tutorial page in the website and replace your project name and sensor name.

## Contributing

Contributions are welcome! Please submit pull requests or open issues for any improvements or new features.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive messages.
4.  Submit a pull request to the main branch.

## License

This project is licensed under the MIT License.