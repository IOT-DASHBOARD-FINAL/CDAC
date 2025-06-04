import time
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
