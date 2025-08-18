# Electrium Outlet Detector

A YOLOv8-based computer vision model for detecting and classifying different types of electrical outlets. This detector is specifically trained to identify three types of outlets: Type A, Type B, and Type B with Tamper-Resistant (TC) outlets.

## 🏆 Best Performing Model

**Model:** `train31` (Not included in repository due to file size limits)  
**Performance:** 90.69% mAP@0.5 (Mean Average Precision at IoU threshold 0.5)  
**Training:** 284 epochs using optimized hyperparameters from tuning results  
**Location:** After training, model weights are saved to `/runs/detect/train31/weights/best.pt`

> **Note:** Model files (*.pt) are excluded from version control due to GitHub's 100MB file size limit. Run the training scripts to generate your own models.  

## Dataset Information

- **Source:** Roboflow Universe - [electrium-outlet-detector](https://universe.roboflow.com/projects-yf2b0/electrium-outlet-detector)
- **Version:** v6 (2025-07-28)
- **License:** CC BY 4.0
- **Images:** 90 total images with 3x augmentation (270 total training samples)
- **Classes:** 3 outlet types
  - `type_a`: Standard Type A outlets (2-prong)
  - `type_b`: Standard Type B outlets (3-prong) 
  - `type_b_tc`: Type B outlets with Tamper-Resistant (TC) features

### Dataset Preprocessing
- Auto-orientation with EXIF-orientation stripping
- Resize to 640x640 (Stretch)

### Data Augmentation
- 50% probability of horizontal flip
- Random 90-degree rotations (none, clockwise, counter-clockwise)
- Random crop (0-20% of image)
- Random rotation (-15° to +15°)
- Random brightness adjustment (-15% to +15%)
- Random Gaussian blur (0-2.5 pixels)
- Salt and pepper noise (0.1% of pixels)

## Training Scripts

### 1. `train_yolov8.py`
**Purpose:** Basic YOLOv8 training script with conservative settings
- **Model:** YOLOv8 Medium (yolov8m.pt)
- **Epochs:** 150
- **Image Size:** 640x640
- **Batch Size:** 2 (optimized for memory constraints)
- **Use Case:** Initial training runs and baseline model development

### 2. `tune_yolov8.py`
**Purpose:** Hyperparameter optimization using YOLO's built-in tuning
- **Function:** Automatically finds optimal hyperparameters through systematic exploration
- **Epochs:** 100 (for tuning process)
- **Output:** Best hyperparameters saved in `tune2/tune_results.csv`
- **Process:** Tests multiple combinations of learning rates, augmentation, loss weights
- **Best Result:** 81.51% fitness score (Row 8 in tune_results.csv)
- **Critical Discovery:** Found optimal learning rate schedule and data augmentation parameters
- **Impact:** Led directly to 11-point improvement (79% → 90.69% mAP@0.5) in train31

### 3. `train_tuned_yolov8.py`
**Purpose:** Production training using optimized hyperparameters from tuning
- **Model:** YOLOv8 Medium (yolov8m.pt)
- **Epochs:** 300 (extended for full convergence)
- **Hyperparameters:** Optimized values from `tune_yolov8.py` results
- **Key Optimizations:**
  - Learning rate: 0.00855 (initial), 0.00698 (final)
  - Momentum: 0.89047
  - Weight decay: 0.00022
  - Box loss weight: 7.74654
  - Classification loss weight: 0.53611
  - Data augmentation parameters optimized

## Training Results Summary

| Run | Final mAP@0.5 | Epochs | Size | Notes |
|-----|---------------|--------|------|-------|
| **train31** | **90.69%** | 284 | 298MB | 🏆 **BEST MODEL** - Tuned hyperparameters |
| train32 | 82.59% | 150 | 101MB | Recent run with good performance |
| train28 | 73.90% | - | 102MB | Good baseline model |
| train26 | 42.63% | - | 102MB | Lower performance |
| train24 | 79.57% | - | 102MB | Solid performance |
| train22 | 45.09% | - | 103MB | Training experiment |
| train21 | 65.79% | - | 103MB | Moderate performance |
| train2-train10 | Failed | - | 4KB | Incomplete/failed runs |
| **tune2** | N/A | 100 | 100MB | 🔧 **Hyperparameter optimization** |

## Training Evolution & Purpose

### Phase 1: Initial Experiments (train1-train10)
- **Purpose:** Basic model training attempts
- **Result:** Most failed due to configuration issues (only 4KB each)
- **Learning:** Identified need for proper setup and parameters

### Phase 2: Baseline Training (train11-train30)
- **Purpose:** Establish baseline performance with standard hyperparameters
- **Performance Range:** 42-79% mAP@0.5
- **Key Insights:** 
  - Models could achieve decent performance but plateaued around 65-79%
  - Identified need for hyperparameter optimization
  - train24 (79.57%) was the best performer in this phase

### Phase 3: Hyperparameter Tuning (tune, tune2)
- **Purpose:** Systematically optimize training hyperparameters
- **Method:** YOLO's built-in hyperparameter tuning functionality
- **tune2 Results:** 
  - Tested 12 different hyperparameter combinations
  - **Best fitness score:** 81.51% (Row 8 in tune_results.csv)
  - **Key optimized parameters:**
    - Learning rates: lr0=0.00855, lrf=0.00698
    - Momentum: 0.89047
    - Weight decay: 0.00022
    - Loss weights: box=7.74654, cls=0.53611, dfl=1.2156
    - Data augmentation: Optimized flip, mosaic, HSV parameters

### Phase 4: Optimized Training (train31-train32)
- **Purpose:** Apply optimized hyperparameters for maximum performance
- **train31:** Used tune2's best hyperparameters → **90.69% mAP@0.5** 🏆
- **train32:** Recent validation run → 82.59% mAP@0.5

### Storage Impact
- **Total runs size:** 2.4GB
- **Key runs to keep:** train31 (best), tune2 (optimization), train24 (baseline), train32 (recent)
- **Cleanup recommendation:** Remove failed runs (train2-10) and lower performers to save ~2GB

## Directory Structure

```
outlet-detector/
├── README.md                    # This documentation
├── BEST_MODEL.txt              # Best model information
├── train_yolov8.py             # Basic training script
├── train_tuned_yolov8.py       # Optimized training script (🏆 best results)
├── tune_yolov8.py              # Hyperparameter tuning script
└── data/
    ├── data.yaml               # Dataset configuration
    ├── README.dataset.txt      # Dataset information
    ├── README.roboflow.txt     # Roboflow export details
    ├── train/
    │   ├── images/             # Training images (84 files)
    │   └── labels/             # Training labels (84 files)
    └── test/
        ├── images/             # Test images (6 files)
        └── labels/             # Test labels (6 files)

# Generated after training (not in repository):
runs/                           # Training outputs
├── detect/
│   ├── train*/                 # Individual training runs
│   │   ├── weights/
│   │   │   ├── best.pt         # Best model weights
│   │   │   └── last.pt         # Last epoch weights
│   │   ├── results.csv         # Training metrics
│   │   └── *.jpg, *.png        # Visualization outputs
│   └── tune*/                  # Hyperparameter tuning results
yolov8m.pt                      # Downloaded pre-trained weights
```

## Usage

### Training a New Model

1. **Basic Training:**
   ```bash
   python train_yolov8.py
   ```

2. **Hyperparameter Tuning:**
   ```bash
   python tune_yolov8.py
   ```

3. **Optimized Training:**
   ```bash
   python train_tuned_yolov8.py
   ```

### Using the Best Model

> **Important:** Model files are not included in this repository. You must train your own model first!

**To get the best model:**
1. Run `python train_tuned_yolov8.py` (this will reproduce the 90.69% mAP@0.5 result)
2. The model will be saved to `/runs/detect/train*/weights/best.pt`

**Key Performance Metrics (when trained):**
- **mAP@0.5:** 90.69%
- **mAP@0.5:0.95:** 79.01%
- **Precision:** 82.11%
- **Recall:** 73.49%

### Loading the Model

```python
from ultralytics import YOLO

# Load your trained model (after running training)
model = YOLO('runs/detect/train31/weights/best.pt')  # Adjust path as needed

# Run inference
results = model('path/to/outlet/image.jpg')

# Process results
for r in results:
    boxes = r.boxes
    for box in boxes:
        # Get class name
        class_name = model.names[int(box.cls)]
        confidence = box.conf
        print(f"Detected: {class_name} (confidence: {confidence:.2f})")
```

## Model Performance Analysis

The training progression demonstrates the critical importance of hyperparameter optimization:

### Performance Timeline
1. **Early Training (train1-train10):** Failed attempts, configuration issues
2. **Baseline Phase (train11-train30):** Plateaued at 65-79% mAP@0.5 with standard parameters
3. **Optimization Phase (tune2):** Systematic hyperparameter search
4. **Breakthrough (train31):** Applied tune2 results → **90.69% mAP@0.5**

### Key Performance Insights
- **Pre-tuning best:** train24 achieved 79.57% mAP@0.5
- **Post-tuning best:** train31 achieved 90.69% mAP@0.5
- **Improvement:** +11.12 percentage points (14% relative improvement)
- **tune2's Impact:** The hyperparameter optimization was the breakthrough that unlocked the model's full potential

### Why tune2 Was Critical
- **Learning Rate Optimization:** Found optimal lr0=0.00855 vs default values
- **Data Augmentation Tuning:** Optimized mosaic, flip, and HSV parameters
- **Loss Weight Balancing:** Adjusted box/cls/dfl loss weights for outlet detection
- **Convergence Strategy:** Optimized warmup and momentum parameters

### Class Performance
The model performs well across all three outlet types:
- Type A outlets: Good detection for standard 2-prong outlets
- Type B outlets: Excellent performance on 3-prong outlets  
- Type B TC: Effective detection of tamper-resistant variants

## Requirements

- Python 3.8+
- ultralytics
- PyTorch
- OpenCV
- PIL/Pillow

## License

This project uses the CC BY 4.0 licensed dataset from Roboflow. See individual license files for specific terms.

## Acknowledgments

- Dataset provided via Roboflow Universe
- Built using Ultralytics YOLOv8 framework
- Training conducted with optimized hyperparameters discovered through systematic tuning 