export const Esp32_WifiSetUp_code = `#ifndef WIFI_SETUP_H
#define WIFI_SETUP_H

#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void connectToWiFi() {
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nConnected to WiFi!");
}

#endif
`

export const RaspBerryPi_WifiSetUp_code = `import os
import time

# WiFi Credentials
SSID = "YOUR_WIFI_SSID"
PASSWORD = "YOUR_WIFI_PASSWORD"

def connect_to_wifi():
    """
    Connects Raspberry Pi to Wi-Fi.
    """
    print("Connecting to WiFi...")

    # Execute Linux command to connect to Wi-Fi
    os.system(f"nmcli dev wifi connect '{SSID}' password '{PASSWORD}'")

    # Check if connected
    connected = False
    for _ in range(10):  # Retry for 5 seconds
        status = os.popen("nmcli -t -f ACTIVE,SSID dev wifi | grep '^yes'").read()
        if SSID in status:
            connected = True
            break
        time.sleep(0.5)
        print(".", end="", flush=True)

    if connected:
        print("\nConnected to WiFi!")
    else:
        print("\nFailed to connect to WiFi.")

`