"""
Optimized YOLOv8 Training Script for Outlet Detection
====================================================

🏆 THIS SCRIPT PRODUCED THE BEST MODEL (90.69% mAP@0.5)

This script uses the optimal hyperparameters discovered through hyperparameter tuning
to train the highest-performing outlet detection model.

Model Performance (train31):
- mAP@0.5: 90.69%
- mAP@0.5:0.95: 79.01%
- Precision: 82.11%
- Recall: 73.49%

The hyperparameters below were optimized using tune_yolov8.py and represent
the best configuration found through systematic exploration.
"""

from ultralytics import YOLO

# Load a pre-trained YOLOv8 model (downloads automatically if not present)
model = YOLO('yolov8m.pt')

# Train the model using the best hyperparameters found by the tuner.
# We are training for 300 epochs to allow the model to fully converge
# with these new, optimized settings.
results = model.train(
    data='backend/outlet-detector/data/data.yaml',
    epochs=300,
    imgsz=640,
    lr0=0.00855,
    lrf=0.00698,
    momentum=0.89047,
    weight_decay=0.00022,
    warmup_epochs=2.88127,
    warmup_momentum=0.74331,
    box=7.74654,
    cls=0.53611,
    dfl=1.2156,
    hsv_h=0.0124,
    hsv_s=0.79019,
    hsv_v=0.35853,
    degrees=0.0,
    translate=0.08127,
    scale=0.60896,
    shear=0.0,
    perspective=0.0,
    flipud=0.0,
    fliplr=0.46581,
    bgr=0.0,
    mosaic=0.81999,
    mixup=0.0,
    cutmix=0.0,
    copy_paste=0.0
) 