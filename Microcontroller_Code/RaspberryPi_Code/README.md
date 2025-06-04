# Microcontroller -RASPBERRY PI

## Overview
  This folder contains the embedded systems code for Raspberry Pi  , which are integral to the IoT application. It  has specific functionalities tailored for real-time sensor data acquisition, processing, and communication.

## PreRequisites
* WiFi-enabled microcontroller (Raspberry Pi)
* Internet connection
* Power supply for microcontroller
* Basic knowledge of microcontroller programming(Python)

## Key Files
* `WiFiSetup.py`: Code to connect ESP32 to a WiFi network.
* `SensorData.py`: Retrieves and processes sensor data.
* `ESP32_ExampleCode.py`: Shows the Example program.
* `ESP32_SampleCode.py`: Explains the basic syntax to configure with the website.

### Wifi Setup
 * Replace the SSID and Wifi Password for the Wifi Connection.
 * Connect the Wifi  to the ESP32 Microcontroller

### SensorData Communication
Deployed Backend Url

```
BASE_URL = "https://iot-application-backend.onrender.com/api/projects"
```

``` 
authToken = "Bearer YOUR_AUTH_TOKEN"; 
```  
Replace the `YOUR_AUTH_TOKEN` with your actual token.

```
f"{BASE_URL}/{project_name}/sensor/{sensor_name}/getValue";
``` 
 Replace the `projectName` and `sensorName` with your actual project name and sensor. Fetches the latest sensor data from the API.

```
f"{BASE_URL}/{project_name}/sensor/{sensor_name}/sendValue"
```
Replace  Replace the `projectName` and `sensorName` with your actual project name and sensor. Sends sensor state data to the API

### Example Code
  To compile and upload this code to your RaspBerry Pi , use the with the necessary libraries installed. Select the correct board and port before uploading

### Sample Code for Initial Setup:

* Ensure that your Wifi connection is stable and connected to the Raspberry Pi
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