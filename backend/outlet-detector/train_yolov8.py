"""
Basic YOLOv8 Training Script for Outlet Detection
=================================================

This script provides basic training functionality for the outlet detector model.
It uses conservative settings optimized for systems with limited memory.

Model: YOLOv8 Medium (yolov8m.pt)
Dataset: 3 outlet types (type_a, type_b, type_b_tc)
Performance: Typically achieves 65-82% mAP@0.5

For best results, use train_tuned_yolov8.py with optimized hyperparameters.
"""

from ultralytics import YOLO

# Load a pre-trained YOLOv8 model (downloads automatically if not present)
model = YOLO('yolov8m.pt')

# Train the model on the custom outlet dataset
# Using very small batch size and fewer epochs to prevent memory crashes
results = model.train(data='backend/outlet-detector/data/data.yaml', epochs=150, imgsz=640, batch=2) 