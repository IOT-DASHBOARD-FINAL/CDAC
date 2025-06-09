#!/bin/bash
echo "Checking for new image at $(date)..."

kubectl set image deployment/iot-atem-frontend frontend-container=tharanika/iot-frontend:latest --record
kubectl rollout restart deployment/iot-application-frontend

kubectl set image deployment/iot-application-backend backend-container=tharanika/iot-backend:latest --record
kubectl rollout restart deployment/iot-application-backend
