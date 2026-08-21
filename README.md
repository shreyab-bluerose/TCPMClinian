# TCPM Clinical Interpreter

A clinician-facing web application for interpreting structured biomarker panels through the **Trauma Care Progression Model (TCPM)** framework.

## How to Run the System

### Prerequisites

The application is a browser-based client-side system. You only need:

- Python 3 installed, for the simplest local server option
- A modern web browser such as Chrome, Edge, or Firefox
- The complete project folder with `index.html`, `css/`, `js/`, and `assets/`

No backend server or database is required for the basic application workflow.

### Option 1 — Run with Python

1. Open a terminal or PowerShell.
2. Navigate to the project folder, the folder containing `index.html`.

Windows PowerShell example:

```powershell
cd "C:\path\to\tcpm-clinical-interpreter"
```

3. Start the local web server:

```powershell
python -m http.server 8000
```

If `python` is not recognized, try:

```powershell
py -m http.server 8000
```

4. Open the application in your browser:

```text
http://localhost:8000
```

5. Keep the terminal running while using the application. Stop the server with:

```text
Ctrl + C
```

### Option 2 — VS Code Live Server

If using Visual Studio Code:

1. Open the project folder in VS Code.
2. Install the **Live Server** extension, if it is not already installed.
3. Open `index.html`.
4. Right-click the file and select **Open with Live Server**.
5. The application will open in a browser using a local URL such as:

```text
http://127.0.0.1:5500/
```

### Recommended Test Workflow

After the application opens:

```text
1. Clinical Context
        ↓
2. Enter clinical context
        ↓
3. Panel Entry
        ↓
4. Enter biomarkers or upload the supported PDF
        ↓
5. Run TCPM
        ↓
6. Review Overview
        ↓
7. Open Case Review
        ↓
8. Open Recommendations
        ↓
9. Export Report
```

### Important Development Notes

The browser should load the JavaScript files in the order shown in the **Script Loading Order** section. In particular, `recommendation-library.js` must be loaded before `recommendations.js`.

If the application displays stale JavaScript or CSS after changes, perform a hard refresh in the browser:

```text
Ctrl + Shift + R
```

If a JavaScript error appears, open the browser developer tools with:

```text
F12
```

and inspect the **Console** tab.


>This application is a clinical decision-support tool. It is not a diagnostic system, medical device, or prescribing tool. Outputs are intended for licensed clinicians and must be interpreted with the patient's full clinical context.

## Overview

The application follows a workflow from clinical context and biomarker panel entry through TCPM interpretation and clinical support recommendations:

```text
Clinical Context
      ↓
Panel Entry / PDF Upload
      ↓
TCPM Calculation
      ↓
Overview Dashboard
      ↓
Case Review
      ↓
Integrated Recommendations
      ↓
Export Report
```

The design follows the TCPM five-stage framework and presents findings using conditional, trauma-informed language. The design brief requires recommendations to be stage-specific, evidence-graded, referenced, and framed as clinical considerations rather than prescriptions.

## Main Features

### 1. Clinical Context

Collects the context used alongside biomarker interpretation, including:

- Primary presentation
- Trauma history/type
- Treatment status
- Current therapy
- Comorbidities
- Medications

### 2. Panel Entry

Supports entering biomarker results and uploading structured PDF reports. Biomarker values are extracted and normalized before TCPM processing.

### 3. TCPM Engine

The TCPM calculation currently follows the application pipeline:

```text
Extract marker values
        ↓
Assign biomarker tiers (T1–T4)
        ↓
Compute TCPM axes
        ↓
Compute state / stage position
        ↓
Determine TCPM zone
```

The main TCPM calculations are implemented in `js/tcpm.js`.

### 4. Overview

The primary dashboard provides:

- Prominent TCPM zone/stage indicator
- Primary and secondary stage information
- Biological signal category summary
- Overall biological burden
- Two-sentence clinical narrative connected to patient context
- Mandatory clinical disclaimer

### 5. Case Review

The Case Review follows the six-section TCPM format:

1. Main Biological Signals
2. Most Relevant TCPM Stage(s) with rationale
3. Biological Interpretation
4. Stress and Trauma Context
5. Supportive Clinical Considerations
6. Remaining Uncertainty

The Three Buckets structure is embedded as:

- Observed Findings
- Plausible Interpretation
- Clinical Uncertainty

The Case Review renderer updates the existing HTML structure rather than replacing the page markup, preserving the page styling.

### 6. Integrated Recommendations

Recommendations are stored in `js/recommendation-library.js` and rendered by `js/recommendations.js`.

Each recommendation can contain:

- TCPM stage
- Signal category
- Recommendation title
- Evidence grade
- One-sentence mechanism
- Reference
- PMID, where available
- Clinical flag / additional oversight note

Recommendations are presented as one integrated, priority-ordered list rather than separate therapy, nutrition, exercise, and lifestyle sections.

### 7. Export

The Export Report action creates a PDF containing:

1. Overview
2. Case Review
3. Recommendations

The PDF is generated client-side from the rendered application sections.

## Project Structure

```text
project/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── tcpm.js
│   ├── context.js
│   ├── panel-entry.js
│   ├── case-review.js
│   ├── recommendation-library.js
│   ├── recommendations.js
│   └── app.js
│
├── assets/
│   └── blue-rose-logo.png
│
└── README.md
```

## JavaScript Responsibilities

### `app.js`

Controls application-level behavior:

- Page navigation
- Run TCPM button
- Connecting TCPM results to Overview
- Building Case Review output
- Building Recommendations output
- Export workflow

### `tcpm.js`

Contains the TCPM calculation engine, including:

- Biomarker extraction/normalization
- Threshold loading
- Tier assignment
- Reservoir calculation
- Barrier calculation
- Crossing calculation
- State/stage calculation
- Position calculation
- Zone calculation

### `case-review.js`

Builds dynamic Case Review content from the TCPM result and clinical context. It updates the existing Case Review elements rather than replacing the complete page HTML.

### `recommendation-library.js`

Contains the stage-specific recommendation data.

This file should contain the `recommendationLibrary` object only.

### `recommendations.js`

Contains the recommendation engine:

```text
TCPM result
    ↓
Identify primary/secondary stage(s)
    ↓
Select recommendation library entries
    ↓
Remove duplicates
    ↓
Priority-order recommendations
    ↓
Render recommendation cards
```

### `panel-entry.js`

Handles panel entry and PDF-related biomarker input behavior.

### `context.js`

Provides access to the clinical context entered by the clinician.


## Development Notes

The design brief specifies that the application should keep the clinician as the decision-maker, present evidence visibly, use TCPM as the organizing framework, and maintain the Observation / Interpretation / Uncertainty structure throughout interpretive outputs.

When modifying the application, avoid changing the TCPM calculation rules while making UI changes. Keep calculation logic, clinical content, and rendering logic separated so individual pages can be updated without altering the underlying TCPM engine.

## How to Run the System

### Prerequisites

The application is a browser-based client-side system. You only need:

- Python 3 installed, for the simplest local server option
- A modern web browser such as Chrome, Edge, or Firefox
- The complete project folder with `index.html`, `css/`, `js/`, and `assets/`

No backend server or database is required for the basic application workflow.

### Option 1 — Run with Python

1. Open a terminal or PowerShell.
2. Navigate to the project folder, the folder containing `index.html`.

Windows PowerShell example:

```powershell
cd "C:\path\to\tcpm-clinical-interpreter"
```

3. Start the local web server:

```powershell
python -m http.server 8000
```

If `python` is not recognized, try:

```powershell
py -m http.server 8000
```

4. Open the application in your browser:

```text
http://localhost:8000
```

5. Keep the terminal running while using the application. Stop the server with:

```text
Ctrl + C
```

### Option 2 — VS Code Live Server

If using Visual Studio Code:

1. Open the project folder in VS Code.
2. Install the **Live Server** extension, if it is not already installed.
3. Open `index.html`.
4. Right-click the file and select **Open with Live Server**.
5. The application will open in a browser using a local URL such as:

```text
http://127.0.0.1:5500/
```

### Recommended Test Workflow

After the application opens:

```text
1. Clinical Context
        ↓
2. Enter clinical context
        ↓
3. Panel Entry
        ↓
4. Enter biomarkers or upload the supported PDF
        ↓
5. Run TCPM
        ↓
6. Review Overview
        ↓
7. Open Case Review
        ↓
8. Open Recommendations
        ↓
9. Export Report
```

### Important Development Notes

The browser should load the JavaScript files in the order shown in the **Script Loading Order** section. In particular, `recommendation-library.js` must be loaded before `recommendations.js`.

If the application displays stale JavaScript or CSS after changes, perform a hard refresh in the browser:

```text
Ctrl + Shift + R
```

If a JavaScript error appears, open the browser developer tools with:

```text
F12
```

and inspect the **Console** tab.
