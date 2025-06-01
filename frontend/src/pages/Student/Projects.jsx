import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  createProjects,
  getProjectsByUserId,
  deleteProject,
  updateProject,
} from "@/APIs/projectAPI";
import { getSensorByProjectId } from "@/APIs/sensorAPI";
import { useAuth } from "@/context/AuthContext";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button1";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog1";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card1";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Loading from "@/components/loading";

import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const Projects = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false); //create form
  const [isEditing, setIsEditing] = useState(false);//edit form
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    microcontroller: "",
    id: user.id,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (user && user.id) {
          const projectsData = await getProjectsByUserId(user.id);

          if (projectsData.data) {
            const sortedProjects = projectsData.data.sort((a, b) => b.id - a.id);

            // Fetch sensor data for each project
            const projectsWithSensors = await Promise.all(
              sortedProjects.map(async (project) => {
                try {
                  const response = await getSensorByProjectId(project.id, user.id);
                  return { ...project, sensors: response.data || [] };
                } catch (error) {
                  console.error(`Failed to fetch sensors for project ${project.id}:`, error);
                  return { ...project, sensors: [] }; // Assign empty array on failure
                }
              })
            );

            setProjects(projectsWithSensors);
          }
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, projects?.length]);

  const handleDelete = async (projectId) => {
    try {
      const response = await deleteProject(projectId, user.id);

      if (response.status === 'success') {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
        toast.success(response.message);
      } else {
        console.error("Failed to delete project:", response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project" + error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description || !formData.microcontroller) {
        setShowForm(false);
        toast.error("Please fill all fields");
        return;
      }

      const requestData = {
        name: formData.title,
        description: formData.description,
        microcontroller: formData.microcontroller,
        id: user.id,
      };

      if (isEditing) {
        const updatedProject = await updateProject(formData.id, user?.id, { name: requestData.name, description: requestData.description, microcontroller: requestData.microcontroller });
        if (updatedProject.status === "success") {
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.id === formData.id ? updatedProject.data : project
            )
          );
          toast.success(updatedProject.message);
        } else {
          toast.error(updatedProject.message);
        }
      } else {
        const newProject = await createProjects(requestData);
        if (newProject.status === "success") {
          setProjects((prevProjects) =>
            [...prevProjects, newProject.data].sort((a, b) => b.id - a.id)
          );
          toast.success(newProject.message);
        } else {
          toast.error(newProject.message);
        }
      }

      setFormData({ title: "", description: "", microcontroller: "" });
      setIsEditing(false);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("Failed to create project" + error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.name,
      description: project.description,
      microcontroller: project.microcontroller,
      id: project.id,
    });
    setIsEditing(true);
    setShowForm(true);
  };
  
  const handleDialogClose = () => {
    setFormData({ title: "", description: "", microcontroller: "" });
    setShowForm(false);
    setIsEditing(false);
  };

  const handleDialogOpen = () => {
    setShowForm(true);
  };

  const handleExplore = (projectId) => {
    navigate(`/liveTracking/${projectId}`);
  };

  if (loading) {
    return (
      <div className="relative h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <motion.div
      className="p-3 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex my-3 sm:my-5 justify-between items-center md:px-12 lg:px-20 2xl:px-32">
        <h1 className="flex items-center mt-4 text-lg sm:text-xl lg:text-2xl text-foreground font-bold">
          Manage & Explore Projects
        </h1>
        <Dialog open={showForm} onOpenChange={(open) => open ? handleDialogOpen() : handleDialogClose()}>
          <DialogTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }} whileFocus={{ scale: 1.05 }}>
            <Button className="bg-foreground text-secondary hover:bg-quaternary hover:text-foreground font-semibold px-2 mt-4" 
              onClick={() => setShowForm(true)}>
              Create New Project
            </Button>
            </motion.div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md text-foreground font-bold bg-secondary rounded-xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Project" : "Create New Project"}</DialogTitle>
              <DialogDescription className="text-foreground font-bold">
                {isEditing ? "Update project details below" : "Enter project details below"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-4">
                <Label className="font-medium text-foreground">
                  Project Title:
                </Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter Project title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 font-medium"
                />

                <Label className="font-medium text-foreground">
                  Project Description:
                </Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Enter Project Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 font-medium"
                />

                <Label className="font-medium text-foreground">
                  Microcontroller:
                </Label>
                <Input
                  type="text"
                  name="microcontroller"
                  placeholder="Enter MicroController Name"
                  value={formData.microcontroller}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-100 font-medium"
                />
              </div>

              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleDialogClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-foreground hover:bg-tertiary text-white"
                >
                  {isEditing ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Listing Projects */}
      <div className="w-full overflow-auto py-8">
      <motion.div
          className="flex flex-wrap justify-center gap-4 mt-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} whileFocus={{ scale: 1.05 }} whileHover="hover">
              <Card
                className="bg-quaternary rounded-xl shadow-md w-80 md:w-64 lg:w-72 max-w-full h-fit"
              >
              <CardHeader className="bg-gradient-to-r from-foreground to-tertiary text-secondary rounded-t-xl pb-3">
                <div className="flex justify-between">
                  {/* absolute need to applied */}
                  <HoverCard>
                    <HoverCardTrigger>
                      <Trash2
                        className="h-6 w-6 text-destructive cursor-pointer float-right"
                        onClick={() => handleDelete(project.id, user.id)}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="text-foreground bg-gray-300 w-fit cursor-pointer">
                      {" "}
                      Delete
                    </HoverCardContent>
                  </HoverCard>

                  <HoverCard>
                    <HoverCardTrigger>
                      <Pencil
                        className="h-6 w-6 float-right text-secondary-foreground cursor-pointer"
                        onClick={() => handleEdit(project)}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="text-foreground bg-gray-300 w-fit cursor-pointer">
                      Edit
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <CardTitle className="text-xl font-bold text-center">
                  {project.name}
                </CardTitle>
                <CardDescription className="text-base text-secondary text-center">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="py-5 px-2 sm:px-4 md:px-8 flex flex-col justify-between bg-quaternary rounded-b-xl">
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-primary font-semibold">
                    Microcontroller:
                  </div>
                  <div className="text-primary font-medium">
                    {project.microcontroller}
                  </div>
                </div>

                {/* Display Sensors */}
                <div className="my-2">
                  <h3 className="text-lg font-semibold">Sensors:</h3>
                  {project?.sensors?.length > 0 ? (
                  <div className="flex items-center justify-center flex-wrap gap-2 mt-2">
                    {project.sensors.map((sensor) => (
                      <div key={sensor.id} className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-1 rounded-full shadow-md text-sm font-semibold flex items-center gap-1 cursor-pointer select-none">
                        {sensor.name}
                      </div>
                    ))}
                  </div>
                  ) : (
                    <p className="text-center font-semibold text-primary">No sensors found</p>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    className="bg-foreground text-white hover:bg-tertiary hover:text-secondary font-semibold mt-2"
                      onClick={() => handleExplore(project.id)}
                  >
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
