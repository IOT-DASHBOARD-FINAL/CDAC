import React, { useState } from "react";
import { createSensor, deleteSensor, updateSensor } from "@/APIs/sensorAPI";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button1";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

const ManageSensors = ({ projectId, userId, sensors, changeSensors, handleOpen }) => {
  const [sensorId, setSensorId] = useState("");
  const [sensorName, setSensorName] = useState("");
  const [sensorType, setSensorType] = useState("");
  const [sensorUnit, setSensorUnit] = useState("");
  const [sensorMinThreshold, setSensorMinThreshold] = useState("");
  const [sensorMaxThreshold, setSensorMaxThreshold] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateSensor = async () => {
    if (!sensorName || !sensorType || !sensorUnit || !sensorMaxThreshold  || (sensorMinThreshold=== null || sensorMinThreshold === "")) { 
      handleOpen(); toast.error("Please fill in all fields."); 
      return; }

    setLoading(true);
    const data = { name: sensorName, type: sensorType, unit: sensorUnit, minThreshold:sensorMinThreshold, maxThreshold: sensorMaxThreshold, id: userId };
    if(data.type === "INPUT") {
      delete data.minThreshold;
      delete data.maxThreshold;
    }

    try {
      const response = await createSensor(projectId, data);
      if (response.status === "success") {
        toast.success(response.message);
        setSensorName("");
        setSensorType("");
        setSensorUnit("");
        setSensorMinThreshold("");
        setSensorMaxThreshold("");
        changeSensors([...sensors, response.data]);
      } else {
        toast.error(response?.data || response?.message || "Failed to create sensor.");
      }
    } catch (error) {
      console.error("Error while creating sensor:", error);
      toast.error("An error occurred while creating the sensor.");
    } finally {
      handleOpen()
      setLoading(false);
    }
  };

  const handleUpdateSensor = async () => {
    if (!sensorId) { handleOpen(); toast.error("Please select sensor ID to edit."); return; }

    setLoading(true);
    const data = { name: sensorName, type: sensorType, unit: sensorUnit, minThreshold:sensorMinThreshold, maxThreshold: sensorMaxThreshold, id: userId };
    if(data.type === "INPUT") {
      delete data.minThreshold;
      delete data.maxThreshold;
    }

    try {
      const response = await updateSensor(projectId, sensorId, data);
      if (response.status === "success") {
        toast.success(response.message);
        setSensorName("");
        setSensorType("");
        setSensorUnit("");
        setSensorMinThreshold("");
        setSensorMaxThreshold("");
        changeSensors(sensors.map((sensor) => (sensor.id === sensorId ? response.data : sensor)));
      } else {
        toast.error(response?.data || response?.message || "Failed to update sensor.");
      }
    } catch (error) {
      console.error("Error while updating sensor:", error);
      toast.error("An error occurred while updating the sensor.");
    } finally {
      handleOpen()
      setLoading(false);
    }
  };

  const handleDelete = async() => {
    if (!sensorId) { handleOpen();toast.error("Please select a sensor to delete.");return; }
    
    setLoading(true);
    try {
      const response = await deleteSensor(projectId, sensorId, userId);
      if (response.status === "success") {
        toast.success(response.message);
        setSensorId("")
        changeSensors(sensors.filter((sensor) => sensor.id !== sensorId));
      } else {
        toast.error(response?.data || response?.message || "Failed to create sensor.");
      }
    } catch (error) {
      console.error("Error while deleting sensor:", error);
      toast.error("An error occurred while deleting the sensor.");
    } finally {
      handleOpen()
      setLoading(false);
    }
  }

  return (
    <Tabs defaultValue="create" className="w-full">
      <TabsList className="w-full grid grid-cols-3 gap-2 text-foreground">
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="update">Update</TabsTrigger>
        <TabsTrigger value="delete">Delete</TabsTrigger>
      </TabsList>

      {/* Create Sensors */}
      <TabsContent value="create" className="w-full text-center text-foreground overflow-y-auto max-h-[500px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground text-2xl -mb-2">Create Sensor</CardTitle>
            <CardDescription className="text-foreground text-base">
              Click Create when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-foreground text-base -mt-2 w-full">
            <Label className="block pl-2 text-lg text-left pb-2.5">Sensor Name:</Label>
            <Input
              type="text"
              value={sensorName}
              onChange={(e) => setSensorName(e.target.value)}
              placeholder="Enter sensor name"
              className='mb-3'
            />
            <Label className="block pl-2 text-lg text-left pb-2.5">Sensor Type:</Label>
            <Select onValueChange={(value) => { setSensorType(value); if (value === "INPUT") setSensorUnit("status");if (value === "INPUT") setSensorMinThreshold(0); if (value === "INPUT") setSensorMaxThreshold(1);}}>
              <SelectTrigger className="w-full mb-3">
                <SelectValue placeholder="Select sensor type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="INPUT">INPUT</SelectItem>
                  <SelectItem value="OUTPUT">OUTPUT</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label className="block pl-2 text-lg text-left pb-2.5">Sensor Unit:</Label>
            <Input
              type="text"
              value={sensorType === "INPUT" ? "status" : sensorUnit}
              onChange={(e) => setSensorUnit(e.target.value)}
              disabled={sensorType === "INPUT"}
              placeholder="Enter sensor unit"
              className='mb-3'
            />
            <Label className="block pl-2 text-lg text-left pt-1 pb-1">Minimum Threshold:</Label>
            <Input
              type="text"
              value={sensorType === "INPUT" ? "0" : sensorMinThreshold}
              onChange={(e) => setSensorMinThreshold(e.target.value)}
              disabled={sensorType === "INPUT"}
              placeholder="Enter Minimum Threshold"
              className='mb-3'
            />
            <Label className="block pl-2 text-lg text-left pt-1 pb-1">Maximum Threshold:</Label>
            <Input
              type="text"
              value={sensorType === "INPUT" ? "1" : sensorMaxThreshold}
              onChange={(e) => setSensorMaxThreshold(e.target.value)}
              disabled={sensorType === "INPUT"}
              placeholder="Enter Maximum Threshold"
              className='mb-3'
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" className="bg-destructive hover:bg-red-300" onClick={handleOpen}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-foreground hover:bg-primary"
              onClick={handleCreateSensor}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Update Sensor */}
      <TabsContent value="update" className="w-full text-center text-foreground overflow-y-auto max-h-[500px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground text-2xl -mb-2">Update Sensor</CardTitle>
            <CardDescription className="text-foreground text-base">
              Make changes to your sensors here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-foreground text-base -mt-2 w-full">
            <Label className="block pl-2 text-lg text-left pb-1">Choose sensor:</Label>
                <Select onValueChange={(value) => {setSensorId(value.id); setSensorName(value.name); setSensorType(value.type); setSensorUnit(value.unit); setSensorMinThreshold(value.minThreshold); setSensorMaxThreshold(value.maxThreshold);}}>
                <SelectTrigger className="w-full mb-3">
                  <SelectValue placeholder="Select sensor to edit" />
                </SelectTrigger>
                <SelectContent>
                  {sensors.map((sensor) => (
                    <SelectItem key={sensor.id} value={sensor}>
                      {sensor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label className="block pl-2 text-lg text-left pt-1 pb-1">Sensor Name:</Label>
              <Input
                type="text"
                value={sensorName}
                onChange={(e) => setSensorName(e.target.value)}
                placeholder="Enter sensor name"
                className='mb-3'
              />
              <Label className="block pl-2 text-lg text-left pb-1">Sensor Type:</Label>
              <Input type="text" disabled value={sensorType} placeholder='This field cannot be edited' />
              <Label className="block pl-2 text-lg text-left pt-1 pb-1">Sensor Unit:</Label>
              <Input
                type="text"
                value={sensorUnit}
                disabled={sensorType === "INPUT"}
                onChange={(e) => setSensorUnit(e.target.value)}
                placeholder="Enter sensor unit"
                className='mb-3'
              />
              <Label className="block pl-2 text-lg text-left pt-1 pb-1">Minimum Threshold:</Label>
              <Input 
                type="text"
                value={sensorMinThreshold}
                disabled={sensorType === "INPUT"}
                onChange={(e) => setSensorMinThreshold(e.target.value)}
                placeholder="Enter minimum threshold"
                className='mb-3'
              />
              <Label className="block pl-2 text-lg text-left pt-1 pb-1">Maximum Threshold:</Label>
              <Input
              type="text"
              value={sensorMaxThreshold}
              disabled={sensorType === "INPUT"}
              onChange={(e) => setSensorMaxThreshold(e.target.value)} 
              placeholder="Enter maximum threshold"
              className='mb-3'
              />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="cancel" className="bg-destructive hover:bg-red-300" onClick={handleOpen}>
              Cancel
            </Button>
            <Button type="submit" className="bg-foreground hover:bg-primary" onClick={handleUpdateSensor}>
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Delete Sensor */}
      <TabsContent value="delete" className="w-full text-center text-foreground">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground text-2xl -mb-2">Delete Sensor</CardTitle>
            <CardDescription className="text-foreground text-base">
              Select your sensors to delete.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-foreground text-base -mt-2 w-full">
            <Label className="block pl-2 text-lg text-left pb-2.5">Choose sensor:</Label>
            <Select onValueChange={(value) => setSensorId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select sensor to delete" />
              </SelectTrigger>
              <SelectContent>
                {sensors.map((sensor) => (
                  <SelectItem key={sensor.id} value={sensor.id}>
                    {sensor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="cancel" className="bg-destructive hover:bg-red-300" onClick={handleOpen}>
              Cancel
            </Button>
            <Button type="delete" className="bg-foreground hover:bg-primary" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ManageSensors;
