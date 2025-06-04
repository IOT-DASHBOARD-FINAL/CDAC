import RPi.GPIO as GPIO
import time
import Adafruit_DHT

# Define project-specific details
user_id = 1  # Replace with actual user ID
project_name = "Health Glove"  # Replace with actual project name
sensor_name = "Distance"  # Replace with actual sensor name

# GPIO Pin Configuration
TRIG_PIN = 5   # GPIO pin connected to the TRIG pin of the ultrasonic sensor
ECHO_PIN = 18  # GPIO pin connected to the ECHO pin
LED_PIN = 23   # GPIO pin for LED control
SWITCH_PIN = 21  # GPIO pin for switch input

# DHT11 Configuration
DHT_PIN = 4
DHT_SENSOR = Adafruit_DHT.DHT11

# Setup GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(TRIG_PIN, GPIO.OUT)
GPIO.setup(ECHO_PIN, GPIO.IN)
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(SWITCH_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Function to get distance from ultrasonic sensor
def get_distance():
    GPIO.output(TRIG_PIN, False)
    time.sleep(0.1)

    GPIO.output(TRIG_PIN, True)
    time.sleep(0.00001)
    GPIO.output(TRIG_PIN, False)

    pulse_start, pulse_end = 0, 0

    while GPIO.input(ECHO_PIN) == 0:
        pulse_start = time.time()

    while GPIO.input(ECHO_PIN) == 1:
        pulse_end = time.time()

    duration = pulse_end - pulse_start
    distance = (duration * 34300) / 2  # Speed of sound = 34300 cm/s
    return round(distance, 2)

# Function to read DHT11 temperature and humidity
def get_temperature_humidity():
    humidity, temperature = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    if humidity is None or temperature is None:
        return None, None
    return round(temperature, 2), round(humidity, 2)

try:
    while True:
        # Get Distance
        distance_cm = get_distance()
        print(f"Distance (cm): {distance_cm}")

        # Get Temperature and Humidity
        temperature, humidity = get_temperature_humidity()
        if temperature is None or humidity is None:
            print("Error reading temperature and humidity!")
        else:
            print(f"Temperature: {temperature}°C")
            print(f"Humidity: {humidity}%")

        # Read switch state
        switch_state = GPIO.input(SWITCH_PIN)
        print(f"Switch State: {switch_state}")

        # Control LED
        if switch_state == GPIO.LOW:  # Button pressed (pull-up enabled)
            print("Switch Pressed! Turning ON LED")
            GPIO.output(LED_PIN, GPIO.HIGH)
        else:
            print("Switch Released! Turning OFF LED")
            GPIO.output(LED_PIN, GPIO.LOW)

        # Simulate sending sensor data
        # get_latest_sensor_data(project_name, sensor_name, user_id)

        time.sleep(5)  # Send data every 5 seconds

except KeyboardInterrupt:
    print("Exiting...")
    GPIO.cleanup()