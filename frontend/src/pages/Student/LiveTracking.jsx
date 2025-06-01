import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getProjectsByUserId } from "@/APIs/projectAPI";
import { getSensorByProjectId } from "@/APIs/sensorAPI";
import { deleteSensorData, receiveSensorData, sendSensorData } from "@/APIs/sensorDataAPI";
import socket from "@/utils/socket";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card1";
import { Button } from "@/components/ui/button1";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog1"

import Loading from "@/components/loading";
import ManageSensors from "@/components/manageSensors/ManageSensors";
import GaugeCard from "@/components/gauge/gaugeCard";
import SwitchCard from "@/components/switch/switchCard";
import { BarChartCard } from "@/components/chart/BarChartCard";
import { LineChartCard } from "@/components/chart/LineChartCard";
import TableCard from "@/components/table/TableCard";
import { toast } from "sonner";

const LiveTracking = () => {
  const { user } = useAuth();
  const { projectId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await getProjectsByUserId(user?.id);
        setProjects(response.data);
        if (response.data.length > 0) {
          const project = response.data.find((proj) => proj.id === parseInt(projectId));
          setSelectedProject(project || response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    const getSensors = async () => {
      try {
        const response = await getSensorByProjectId(
          selectedProject?.id,
          user?.id
        );
        setSensors(response.data);
        setSensorData([]);
      } catch (error) {
        console.error("Failed to fetch sensors:", error);
        toast.error("Failed to fetch sensors");
      }
    };

    const getSensorData = async () => {
      setLoading(true);
      try {
        const sensorDataPromises = sensors.map((sensor) =>
          receiveSensorData(selectedProject?.id, sensor.id, user?.id)
        );
        const sensorDataResponses = await Promise.all(sensorDataPromises);
        setSensorData(sensorDataResponses.map((response) => response?.data));
        // await console.log(sensorData);
      } catch (error) {
        console.error("Failed to fetch sensors:", error);
        toast.error("Failed to get sensor data");
      } finally {
        setLoading(false);
      }
    };

    user?.id && !selectedProject && getProjects();
    selectedProject?.id && getSensors();
    sensors.length > 0 && getSensorData();
  }, [user?.id, selectedProject?.id, sensors.length]);

  useEffect(() => {
    socket.on("sensorData", (data) => {
      console.log("socket", data);
      setSensorData((prevData) => {
        const updatedData = prevData.map((sensorArray) => {
          if (sensorArray.length > 0 && sensorArray[0].sensorId === data.sensorId) {
            return [...sensorArray, data];
          }
          if (sensorArray.length === 0) {
            return [data];
          }
          return sensorArray;
        });
        return updatedData;
      });
      console.log("sensorData", sensorData);
    });
    socket.on("deleteSensorData", (data) => {
      console.log("socket", data);
      setSensorData((prevData) => {
        const updatedData = prevData.map((sensorArray) => {
          if (sensorArray.length > 0 && sensorArray[0].sensorId === data.sensorId) {
            return sensorArray.filter((sensor) => sensor.id !== data.id);
          }
          return sensorArray;
        });
        return updatedData;
      });
      console.log("sensorData", sensorData);
    });
    return () => {
      socket.off("sensorData");
    };
  }, []);

  const handleSwitchChange = async (sensorId, newValue) => {
    try {
      const response = await sendSensorData(selectedProject.id, sensorId, { id: user?.id, value: newValue });
      console.log(response);
      if (response?.status === "success")
        toast.success(response?.message);
        if (response?.status === "success") {
          setSensorData((prevData) =>
            prevData.map((sensor) =>
              sensor.sensorId === sensorId ? { ...sensor, value: newValue } : sensor
            )
          );
        }
    } catch (error) {
      console.error("Failed to send sensor data:", error);
      toast.error("Failed to send sensor data");
    }
  };

  const handleDelete = async (item) => {
   try {
    const response = await deleteSensorData(item?.projectId, item?.sensorId, item?.id, user?.id)
    if (response?.status === "success") {
      toast.success("Data deleted successfully")
    } else {
      toast.error("Failed to delete data")
    }
  } catch (error) {
    toast.error("Failed to delete data")
  }   
}

  const handleDialogClose = () => {
    setShowForm(false);
  };

  const handleDialogOpen = () => {
    setShowForm(true);
  };

  const handleOpen = () => {
    setShowForm(false);
  }

  const changeSensors = (sensors) => {
    setSensors(sensors);
  }
  if (loading) {
    return (
      <div className="relative h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-3 w-full">
      <div className="flex my-3 sm:my-5 justify-between items-center md:px-12 lg:px-20 2xl:px-32">
        <h1 className="text-lg sm:text-xl lg:text-2xl text-foreground font-bold items-center">
          Track Individual Project
        </h1>
        <Select
          value={selectedProject}
          onValueChange={(value) => setSelectedProject(value)}
        >
          <SelectTrigger className="w-[150px] sm:w-[180px] bg-slate-50">
            <SelectValue
              placeholder={
                selectedProject ? selectedProject.name : "Select a Project"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="h-auto bg-quaternary rounded-xl md:rounded-2xl shadow-xl mx-2 sm:mx-3 md:mx-15 lg:mx-32 mb-6">
        <CardHeader className="flex items-center justify-between p-4">
          <div className="flex items-center lg:space-x-4">
            <img src="/project.png" alt="project" className="w-24 h-24 mr-4" />
            <div className="flex space-x-5 lg:space-x-12">
              <div>
                <CardTitle className="text-2xl font-bold">
                  {selectedProject?.name}
                </CardTitle>
                <CardDescription className="text-lg">
                  {selectedProject?.description}
                </CardDescription>
              </div>
              <div className="hidden md:flex md:flex-col">
                <CardTitle className="text-2xl font-bold">
                  Microcontroller
                </CardTitle>
                <CardDescription className="text-lg pr-2 font-semibold">
                  {selectedProject?.microcontroller}
                </CardDescription>
              </div>
            </div>
          </div>
          <div className="text-right md:hidden">
            <CardDescription className="text-lg font-semibold">
              Microcontroller
            </CardDescription>
            <CardTitle className="text-2xl pr-2 font-bold">
              {selectedProject?.microcontroller}
            </CardTitle>
          </div>
          <Dialog className="w-full" open={showForm} onOpenChange={(open) => open ? handleDialogOpen() : handleDialogClose()}>
            <DialogTrigger asChild>
              <Button className="bg-foreground text-slate-100 hover:bg-primary hover:text-slate-200 font-semibold ">
                Manage Sensors
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full flex flex-col justify-center items-center mt-4 bg-quaternary rounded-xl shadow-xl">
            <DialogTitle className='-mb-2'>Control your Sensors Here!</DialogTitle>
            <DialogDescription className='-mr-2'>
              Manage your sensors here. You can add, edit, or delete sensors as needed.
            </DialogDescription>
              <ManageSensors projectId = {selectedProject?.id} userId = {user?.id} sensors={sensors} handleOpen={handleOpen} changeSensors={changeSensors} />
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      <GaugeCard
        sensors={sensors?.filter((sensor) => sensor.type === "OUTPUT" && sensor.projectId === selectedProject?.id)} 
        sensorData={sensorData?.filter((data, index) => sensors[index]?.type === "OUTPUT" && sensors[index]?.projectId === selectedProject?.id)}
      />

      <div className="lg:px-16">
        <Card className="h-auto bg-quaternary rounded-xl md:rounded-2xl shadow-xl mb-6">
          <CardHeader className="flex items-center justify-between p-4">
            <CardTitle className="text-2xl font-bold">Input Sensors</CardTitle>
            <CardDescription className="text-lg text-center">
              You can control the input device here. You can turn them on or off.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sensors.filter((sensor) => sensor?.type === "INPUT" && sensor.projectId === selectedProject?.id).length === 0 ? (
              <CardDescription className="text-lg text-center font-semibold">
                No output sensors found.
              </CardDescription>
            ) : (
              <div className="w-full overflow-auto flex flex-wrap justify-center gap-4">
                { sensors?.filter((sensor) => sensor?.type === "INPUT" && sensor.projectId === selectedProject?.id).map((sensor) => {
                const matchedSensorData = sensorData.flat().filter((data) => data.sensorId === sensor.id);
                return (
                  <SwitchCard
                    key={sensor.id}
                    sensor={sensor}
                    sensorData={matchedSensorData}
                    onSwitchChange={handleSwitchChange}
                  />
                )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <BarChartCard
        sensors={sensors?.filter((sensor) => sensor.type === "OUTPUT" && sensor.projectId === selectedProject?.id)}
        sensorData={sensorData?.filter((data, index) => sensors[index]?.type === "OUTPUT" && sensors[index]?.projectId === selectedProject?.id)}
      />

      <LineChartCard
        sensors={sensors?.filter((sensor) => sensor?.type === "OUTPUT" && sensor.projectId === selectedProject?.id)}
        sensorData={sensorData?.filter((data, index) => sensors[index]?.type === "OUTPUT" && sensors[index]?.projectId === selectedProject?.id)}
      />

      <TableCard
        sensors={sensors?.filter((sensor) => sensor.projectId === selectedProject?.id)}
        sensorData={sensorData}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default LiveTracking;