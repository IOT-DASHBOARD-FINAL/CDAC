#include "WiFiSetup.h"
#include "SensorData.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// Define project-specific details
const int userId = 1;                // Replace with actual user ID
String projectName = "Health Glove"; // Replace with actual project name
String sensorName = "Distance";      // Replace with actual sensor name

// ultrasonic
#define TRIG_PIN 5  // GPIO pin connected to the TRIG pin of the sensor
#define ECHO_PIN 18 // GPIO pin connected to the ECHO pin of the sensor
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701
long duration;
float distanceCm;

// DHT11 Temperature sensor
#define DHTPIN 4
#define DHTTYPE    DHT11
DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;

// Led Pin
#define LED_PIN 23
#define SWITCH_PIN 21

void setup() {
    Serial.begin(115200);

    //ultrasonic
    pinMode(TRIG_PIN, OUTPUT); // Sets the trigPin as an Output
    pinMode(ECHO_PIN, INPUT); // Sets the echoPin as an Input

    //DHT11 Temperature sensor
    dht.begin();
    sensor_t sensor;
    dht.temperature().getSensor(&sensor);
    delayMS = sensor.min_delay / 1000;

    // LED
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW);
    pinMode(SWITCH_PIN, INPUT_PULLUP);
    
    connectToWiFi(); // Connect to Wi-Fi
}

void loop() {
    //ultrasonic
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);
    duration = pulseIn(ECHO_PIN, HIGH);
    distanceCm = duration * SOUND_SPEED/2;
    Serial.print("Distance (cm): ");
    Serial.println(distanceCm);
  
    //DHT11 Temperature sensor
    delay(delayMS);
    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (isnan(event.temperature))Serial.println(F("Error reading temperature!"));
    else {
      Serial.print(F("Temperature: "));
      Serial.print(event.temperature);
      Serial.println(F("°C"));
    }
    dht.humidity().getEvent(&event);
    if (isnan(event.relative_humidity))Serial.println(F("Error reading humidity!"));
    else {
      Serial.print(F("Humidity: "));
      Serial.print(event.relative_humidity);
      Serial.println(F("%"));
    }

    //LED
    int switchState = digitalRead(SWITCH_PIN);
    Serial.print("Switch State: ");
    Serial.println(switchState);

    // Control LED and Relay
    if (switchState == LOW) { // Switch pressed (since pull-up is enabled)
        Serial.println("Switch Pressed! Turning ON LED");
        digitalWrite(LED_PIN, HIGH);
    } else {
        Serial.println("Switch Released! Turning OFF LED");
        digitalWrite(LED_PIN, LOW);
    }
    
//    getLatestSensorData(projectName, sensorName, userId);

    delay(5000); // Send data every 5 seconds
}
