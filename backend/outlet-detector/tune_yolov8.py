"""
YOLOv8 Hyperparameter Tuning Script for Outlet Detection
========================================================

This script automatically optimizes hyperparameters for the outlet detection model.
It uses YOLO's built-in tuning functionality to find the best training settings.

Process:
1. Runs multiple training experiments with different hyperparameter combinations
2. Evaluates fitness score for each combination
3. Saves the best hyperparameters to tune_results.csv

Best Result Achieved: 81.51% fitness score
Use the output hyperparameters in train_tuned_yolov8.py for optimal performance.
"""

from ultralytics import YOLO

# Load a pre-trained YOLOv8 model (downloads automatically if not present)
model = YOLO('yolov8m.pt')

# Tune hyperparameters on the custom outlet dataset
# This will run for 100 epochs and save the best settings.
model.tune(data='backend/outlet-detector/data/data.yaml', epochs=100, imgsz=640) 