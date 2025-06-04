import requests
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
