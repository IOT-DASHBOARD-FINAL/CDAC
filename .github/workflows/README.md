# GitHub Actions Workflow for IoT Application
### This cover the CI (Continuous Integration)
This repository contains a GitHub Actions workflow that automates the CI pipeline for the IoT Application. The workflow builds and pushes Docker images for both the backend and frontend services to Docker Hub. It also ensures that environment variables are securely passed during the build process.

---

## Why Is This Workflow Needed?

This workflow is essential for automating the CI/CD pipeline, ensuring that:

- The latest code changes are built and deployed as Docker images.
- Environment variables are securely passed during the build process.
- Developers can focus on writing code without worrying about manual deployment steps.
- The application is always up-to-date with the latest changes.

---

## How Does It Work?

### Workflow File: `.github/workflows/deploy.yml`

The workflow is triggered on every push to the `main` branch or manually via the `workflow_dispatch` event.

### Steps in the Workflow:

1. **Checkout Code**:
   - Uses the `actions/checkout@v3` action to pull the latest code from the repository.

2. **Set Up Docker Buildx**:
   - Uses the `docker/setup-buildx-action@v2` action to configure Docker Buildx for building Docker images.

3. **Login to Docker Hub**:
   - Uses the `docker/login-action@v2` action to authenticate with Docker Hub.
   - Secrets `DOCKER_USERNAME` and `DOCKER_PASSWORD` are used for authentication.

4. **Build and Push Backend Image**:
   - Builds the backend Docker image using the `backend/Dockerfile`.
   - Passes the `JWT_SECRET` and `DATABASE_URL` environment variables securely as build arguments.
   - Pushes the built image to Docker Hub.

5. **Build and Push Frontend Image**:
   - Builds the frontend Docker image using the `frontend/Dockerfile`.
   - Passes the `VITE_APP_BACKEND_URL` environment variable securely as a build argument.(the env for react is passed at the build stage, since after build, the code is converted into static HTML file.No env can be passed at runtime)
   - Pushes the built image to Docker Hub.

---

## Secrets Used in the Workflow

The following secrets are used in the workflow:

1. **`DOCKER_USERNAME`**:
   - Your Docker Hub username.
   - Used to authenticate with Docker Hub.

2. **`DOCKER_PASSWORD`**:
   - Your Docker Hub password(Personal Access Token).
   - Used to authenticate with Docker Hub.

3. **`VITE_APP_BACKEND_URL`**:
   - The backend URL used by the React frontend during the build process.
   - This is passed as a build argument to the frontend Docker image.

---

## How to Set Up the Secrets

To set up the secrets in your GitHub repository:

1. Go to your repository on GitHub.
2. Click on `Settings`.
3. Navigate to `Secrets and variables` > `Actions`.
4. Click on `New repository secret`.
5. Add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username.
   - `DOCKER_PASSWORD`: Your Docker Hub password or access token.
   - `VITE_APP_BACKEND_URL`: The backend URL (e.g., `https://your-backend-url.com` or `http://localhost:3000`).

---

## How to Trigger the Workflow

The workflow is triggered automatically on every push to the `main` branch. You can also trigger it manually:

1. Go to the `Actions` tab in your GitHub repository.
2. Select the `CI/CD Pipeline` workflow.
3. Click on `Run workflow` and select the branch to run it on.

---

## How the Frontend Environment Variable Works

The `VITE_APP_BACKEND_URL` is passed as a build argument during the frontend build process. Since React applications are static after build, the environment variable is embedded into the static files (e.g., `index.html`, `main.js`) during the build process. After the build, the environment variable cannot be changed dynamically.

---
