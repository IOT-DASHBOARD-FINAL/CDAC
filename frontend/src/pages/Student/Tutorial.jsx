import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card1";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/utils/auth";
import { esp_SampleCode, python_Samplecode } from "@/assets/microcontrollerCode/sampleCode";
import { Esp32_ExampleCode, RaspBerryPi_ExampleCode } from "@/assets/microcontrollerCode/exampleCode";
import { esp32_SensorData, RaspberryPi_SensorData } from "@/assets/microcontrollerCode/sensorData";
import { Esp32_WifiSetUp_code, RaspBerryPi_WifiSetUp_code } from "@/assets/microcontrollerCode/WifiSetup";

const Tutorial = () => {
  const { user } = useAuth()
  const token = getToken()

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="px-2 sm:px-4 lg:px-8 xl:px-12 mt-8"
    >
      <Card className="shadow-xl">
        <CardHeader className="bg-foreground text-secondary rounded-t-lg pb-3">
          <CardTitle className="text-xl font-bold mb-0 text-center">
            Getting Started: Sending Data from Hardware
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6 px-4 md:px-8 bg-secondary rounded-b-lg">
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Introduction</h2>
            <p className="mb-4">
              This guide will help you connect your hardware devices (ESP32,
              Raspberry Pi) to our platform, manage projects, and send sensor
              data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Prerequisites</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                WiFi-enabled microcontroller (ESP32, ESP8266, Raspberry Pi)
              </li>
              <li>Internet connection</li>
              <li>Power supply for microcontroller</li>
              <li>
                Basic knowledge of microcontroller programming(Embedded C,
                Python,etc,.)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">Workflow Overview</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>Create an account and log in.</li>
              <li>Navigate to the Projects page via the sidebar.</li>
              <li>Create and manage your projects (Create, List, Delete).</li>
              <li>Click "Explore" on a project to go to Live Tracking.</li>
              <li>
                Manage sensors (Create, Edit, List, Delete) within each project.
              </li>
              <li>
                Input sensors: Toggle switch to change hardware state in
                real-time.
              </li>
              <li>
                Output sensors: View data in gauges, bar charts, line charts,
                and tables.
              </li>
              <li>Real-time updates via Socket.io integration.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold mb-2">API Endpoints</h2>
            <ul className="list-disc list-inside mb-4 break-all space-y-2">
              <li>
                Get sensor data:
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>
                  POST /api/projects/:projectName/sensor/:sensorName/getValue
                </code>
                </pre>
              </li>
              <li>
                Send sensor data:{" "}
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>
                  POST /api/projects/:projectName/sensor/:sensorName/sendValue
                </code>
                </pre>
              </li>
              <li>
                User data to pass in the request body:{" "}
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>"id": {user.id}</code>
                </pre>
              </li>
              <li>
                User Token for header(Format: "Authorization": "Bearer YOUR_TOKEN"):{" "}
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                <code>{token}</code>
                </pre>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg tex font-bold mb-2">
            Sample Code for Initial Setup
            </h2>
            <Tabs defaultValue="esp32" className="flex flex-col items-center">
              <TabsList className="mb-4 flex justify-center w-[240px]">
                <TabsTrigger value="esp32">ESP32/ESP8266</TabsTrigger>
                <TabsTrigger value="raspberry-pi">Raspberry Pi</TabsTrigger>
              </TabsList>

              <TabsContent value="esp32">
                <h2 className="text-lg font-semibold mb-2">
                  ESP32/ESP8266 Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {esp_SampleCode}
                  </code>
                </pre>
              </TabsContent>

              <TabsContent value="raspberry-pi">
                <h2 className="text-lg font-semibold mb-2">
                  Raspberry Pi Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {python_Samplecode}
                  </code>
                </pre>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mb-8">
            <h2 className="text-lg tex font-bold mb-2"> Code for WifiSetup</h2>
            <Tabs defaultValue="esp32" className="flex flex-col items-center">
              <TabsList className="mb-4 flex justify-center w-[240px]">
                <TabsTrigger value="esp32">ESP32/ESP8266</TabsTrigger>
                <TabsTrigger value="raspberry-pi">Raspberry Pi</TabsTrigger>
              </TabsList>

              <TabsContent value="esp32">
                <h2 className="text-lg font-semibold mb-2">
                  ESP32/ESP8266 Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {Esp32_WifiSetUp_code}
                  </code>
                </pre>
              </TabsContent>

              <TabsContent value="raspberry-pi">
                <h2 className="text-lg font-semibold mb-2">
                  Raspberry Pi Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {RaspBerryPi_WifiSetUp_code}
                  </code>
                </pre>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mb-8">
            <h2 className="text-lg tex font-bold mb-2">
             SensorData Communication between  a Microcontroller and a Cloud-based API.
            </h2>
            <Tabs defaultValue="esp32" className="flex flex-col items-center">
              <TabsList className="mb-4 flex justify-center w-[240px]">
                <TabsTrigger value="esp32">ESP32/ESP8266</TabsTrigger>
                <TabsTrigger value="raspberry-pi">Raspberry Pi</TabsTrigger>
              </TabsList>

              <TabsContent value="esp32">
                <h2 className="text-lg font-semibold mb-2">
                  ESP32/ESP8266 Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {esp32_SensorData}
                  </code>
                </pre>
              </TabsContent>

              <TabsContent value="raspberry-pi">
                <h2 className="text-lg font-semibold mb-2">
                  Raspberry Pi Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {RaspberryPi_SensorData}
                  </code>
                </pre>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mb-8">
            <h2 className="text-lg tex font-bold mb-2">
              Example Arduino Code for IoT-based Project
              <p>Send/Receive Data from Hardware</p>
            </h2>
            <Tabs defaultValue="esp32" className="flex flex-col items-center">
              <TabsList className="mb-4 flex justify-center w-[240px]">
                <TabsTrigger value="esp32">ESP32/ESP8266</TabsTrigger>
                <TabsTrigger value="raspberry-pi">Raspberry Pi</TabsTrigger>
              </TabsList>

              <TabsContent value="esp32">
                <h2 className="text-lg font-semibold mb-2">
                  ESP32/ESP8266 Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {Esp32_ExampleCode}
                  </code>
                </pre>
              </TabsContent>

              <TabsContent value="raspberry-pi">
                <h2 className="text-lg font-semibold mb-2">
                  Raspberry Pi Code
                </h2>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  <code className="whitespace-pre-wrap break-all">
                  {RaspBerryPi_ExampleCode}
                  </code>
                </pre>
              </TabsContent>
            </Tabs>
          </section>
          
          <section className="mb-8">
          <h2 className="text-lg font-bold mb-2" > To Clarify the Doubts:  
          <a href="https://github.com/KAVIRAJec/Iot-Application/tree/main/Microcontroller_Code" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View On Github</a> </h2>
         </section>
         
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Tutorial;
