# Continuous Deployment (CD) using K3s


## Why Kubernetes (K8s) and K3s for Deployment?

### Kubernetes (K8s):
Kubernetes is an industry-standard container orchestration platform used to manage, scale, and deploy containerized applications efficiently. It provides features like self-healing, load balancing, and automated rollouts/rollbacks, making it ideal for large-scale applications.

### K3s:
K3s is a lightweight, easy-to-install Kubernetes distribution designed for resource-constrained environments, IoT devices, and edge computing. It offers the same functionality as K8s but with reduced complexity and overhead, making it a great choice for small to medium-scale applications.

## Prerequisites

Ensure you have the following installed:
- [Docker](https://www.docker.com/)
- [K3s](https://k3s.io/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- A GitHub repository with GitHub Actions enabled

## Step1: Cloning and Installation

1. **Clone the repository:**

    ```
    git clone https://github.com/KAVIRAJec/Iot-Application.git
    ```
2.  **Navigate to folder:**
    ```
    cd K8S-CD
    ```

3. **Install K3s:**
    ```sh
    curl -sfL https://get.k3s.io | sh -
    ```
    **Start K3s:**
    ```
    sudo systemctl start k3s
    ```
    **Verify the cluster status:**
    ```sh
    kubectl cluster-info
    ```
    **Check nodes:**

    ```sh
    kubectl get nodes
    ```

##  Step 2: Create a Kubernetes Deployment

Create a `deployment.yaml` file

**Apply the deployment:**

```sh
kubectl apply -f backend/deployment.yaml
kubectl apply -f frontend/deployment.yaml
```

 ## Step 3: **Create a Service**

Create a `service.yaml` file

**Apply the service:**
```sh
kubectl apply -f backend/service.yaml
kubectl apply -f frontend/service.yaml
```

**Get the service details:**
```sh
kubectl get svc
```
## Step 4: **Create a Secrete file to hold the Crendentials**

Create a `secret.yaml` file

**Apply the secrete**
```
kubectl apply -f secret.yaml
```

## Step 5: **Verify Deployment & Service**

Check running pods:
```sh
kubectl get pods
```

Check service details:
```sh
kubectl get svc
```

## Step 6: Automate Image Update and Rollout Restart
 
**Create an `k3s-auto-update.sh` script for automatic image updates**

**Make the script executable:**
```sh
chmod +x /usr/local/bin/k3s-auto-update.sh
```
### Enable Automatic Updates with Systemd

Create a systemd service file for auto-updates:
```sh
sudo nano /etc/systemd/system/k3s-auto-update.service
```
Enter the code in the opened Workspace

```sh
[Unit]
Description=Auto update K3S Deployment every 30 seconds
After=network.target

[Service]
ExecStart=/bin/bash -c 'sleep 30; /usr/local/bin/k3s-auto-update.sh'
Restart=always
User=root

[Install]
WantedBy=multi-user.target

```
After this press **Ctrl+X -> Y -> Press Enter**

### Enable Periodic Updates with Watch Command
You can use the `watch` command to periodically check for new images and update the deployment every 30 seconds:
```sh
watch -n 30 /usr/local/bin/k3s-auto-update.sh
```


**Run the script to update images:**
```sh
sudo systemctl daemon-reload
sudo systemctl enable k3s-auto-update.service
sudo systemctl start k3s-auto-update.service
sudo systemctl status k3s-auto-update.service
```
## To Delete the Deployement and Service 

```sh
kubectl delete pod iot-application-backend iot-application-frontend
kubectl delete deployment iot-application-backend iot-application-frontend
kubectl delete service iot-application-backend-service
kubectl delete service iot-application-frontend-service
```

## If you have done any changes in your code , after the changes restart the automation

**To restart the automation , run this command:**
```
sudo systemctl restart k3s-auto-update.service
```
## Contributing

Contributions are welcome! Please submit pull requests or open issues for any improvements or new features.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive messages.
4.  Submit a pull request to the main branch.

## License

This project is licensed under the MIT License.