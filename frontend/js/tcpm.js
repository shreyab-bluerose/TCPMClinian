/* ===========================================
   TCPM STAGE ENGINE
   20 Biomarkers
   Elevated = Fold Change > 1.4
=========================================== */


/* ===========================================
   1. BIOMARKER GROUPS
=========================================== */

const BIOMARKER_GROUPS = {

    immune: [
        "MCP1",
        "CD163",
        "IL8",
        "IL17",
        "IFNG",
        "NLRP3",
        "CASP1"
    ],

    inflammatory: [
        "IL1B",
        "IL6",
        "IL10",
        "TNFA",
        "TGFB1",
        "CRP"
    ],

    oxidative: [
        "HMOX1",
        "COX2",
        "NOS2",
        "CYCS",
        "LDHA",
        "LDHB"
    ],

    structural: [
        "COL1A1"
    ]
};


/* ===========================================
   2. NORMALIZE MARKER NAMES
=========================================== */

function normalizeMarkerName(marker) {

    const aliases = {

        "MCP-1": "MCP1",
        "MCP1": "MCP1",
        "CCL2": "MCP1",

        "CD163": "CD163",

        "IL-8": "IL8",
        "IL8": "IL8",
        "CXCL8": "IL8",

        "IL-17": "IL17",
        "IL17": "IL17",

        "IFNG": "IFNG",
        "IFNγ": "IFNG",
        "IFN-G": "IFNG",

        "NLRP3": "NLRP3",
        "CASP1": "CASP1",

        "IL-1β": "IL1B",
        "IL1B": "IL1B",

        "IL-6": "IL6",
        "IL6": "IL6",

        "IL-10": "IL10",
        "IL10": "IL10",

        "TNF-α": "TNFA",
        "TNFA": "TNFA",

        "TGF-β1": "TGFB1",
        "TGFB1": "TGFB1",

        "CRP": "CRP",

        "HMOX1": "HMOX1",

        "COX-2": "COX2",
        "COX2": "COX2",

        "NOS2": "NOS2",
        "CYCS": "CYCS",
        "LDHA": "LDHA",
        "LDHB": "LDHB",

        "COL1A1": "COL1A1"
    };

    return aliases[marker] || marker;
}


/* ===========================================
   3. EXTRACT BIOMARKER VALUES
=========================================== */

function extractMarkers() {

    const markers = {};

    document.querySelectorAll("[data-marker]").forEach(input => {

        const rawName = input.dataset.marker;

        const marker = normalizeMarkerName(rawName);

        const value = parseFloat(input.value);

        markers[marker] = Number.isFinite(value) ? value : 0;

    });

    return markers;
}


/* ===========================================
   4. ELEVATION
=========================================== */

function isElevated(marker, markers) {

    return (markers[marker] || 0) > 1.4;

}


/* ===========================================
   5. CATEGORY COUNTS
=========================================== */

function countElevated(markerList, markers) {

    return markerList.filter(marker =>
        isElevated(marker, markers)
    ).length;

}


/* ===========================================
   6. NEUROIMMUNE PATTERN
=========================================== */

function hasNeuroimmunePattern(markers) {

    const inflammasome =
        isElevated("NLRP3", markers) &&
        isElevated("CASP1", markers) &&
        isElevated("IL1B", markers);

    const bbbSynergy =
        isElevated("IL17", markers) &&
        isElevated("IFNG", markers);

    return inflammasome || bbbSynergy;
}


/* ===========================================
   7. EXTREME ELEVATION
=========================================== */

function hasExtremeElevation(markers) {

    return (
        (markers.TNFA || 0) > 10 ||
        (markers.IL10 || 0) > 10 ||
        (markers.IL8 || 0) > 10 ||
        (markers.CASP1 || 0) > 10
    );

}


/* ===========================================
   8. CALCULATE STAGE + ZONE
=========================================== */

function calculateStage(markers) {

    const immuneCount = countElevated(
        BIOMARKER_GROUPS.immune,
        markers
    );

    const inflammatoryCount = countElevated(
        BIOMARKER_GROUPS.inflammatory,
        markers
    );

    const oxidativeCount = countElevated(
        BIOMARKER_GROUPS.oxidative,
        markers
    );

    const structuralCount = countElevated(
        BIOMARKER_GROUPS.structural,
        markers
    );

    const neuroimmune = hasNeuroimmunePattern(markers);

    const extreme = hasExtremeElevation(markers);

    const col1a1Elevated =
        isElevated("COL1A1", markers);


    let primaryStage = 1;
    let secondaryStage = null;
    let zone = "Green";


    /* ---------------------------------------
       PRIORITY 1
       Extreme + Neuroimmune
    --------------------------------------- */

    if (extreme && neuroimmune) {

        primaryStage = 3;
        secondaryStage = 5;
        zone = "Orange";

    }


    /* ---------------------------------------
       PRIORITY 2
       Extreme only
    --------------------------------------- */

    else if (extreme) {

        primaryStage = 2;
        secondaryStage = 4;
        zone = "Yellow";

    }


    /* ---------------------------------------
       PRIORITY 3
       Neuroimmune only
    --------------------------------------- */

    else if (neuroimmune) {

        primaryStage = 3;
        secondaryStage = 2;
        zone = "Orange";

    }


    /* ---------------------------------------
       PRIORITY 4
       Structural
    --------------------------------------- */

    else if (col1a1Elevated) {

        primaryStage = 4;
        secondaryStage = 5;
        zone = "Red";

    }


    /* ---------------------------------------
       PRIORITY 5
       >=2 Immune OR >=2 Inflammatory
    --------------------------------------- */

    else if (
        immuneCount >= 2 ||
        inflammatoryCount >= 2
    ) {

        primaryStage = 2;
        secondaryStage = 1;
        zone = "Yellow";

    }


    /* ---------------------------------------
       PRIORITY 6
       >=1 Immune OR >=1 Inflammatory
    --------------------------------------- */

    else if (
        immuneCount >= 1 ||
        inflammatoryCount >= 1
    ) {

        primaryStage = 1;
        secondaryStage = null;
        zone = "Green";

    }


    /* ---------------------------------------
       PRIORITY 7
       Nothing elevated
    --------------------------------------- */

    else {

        primaryStage = 1;
        secondaryStage = null;
        zone = "Green";

    }


    return {

        primaryStage,
        secondaryStage,
        zone,

        immuneCount,
        inflammatoryCount,
        oxidativeCount,
        structuralCount,

        neuroimmune,
        extreme,

        col1a1Elevated

    };

}


/* ===========================================
   9. MAIN TCPM FUNCTION
=========================================== */

function runTCPM() {

    const markers = extractMarkers();

    const result = calculateStage(markers);


    console.log("================================");
    console.log("TCPM RESULT");
    console.log("================================");

    console.log("Markers:", markers);

    console.log(
        "Immune:",
        result.immuneCount
    );

    console.log(
        "Inflammatory:",
        result.inflammatoryCount
    );

    console.log(
        "Oxidative:",
        result.oxidativeCount
    );

    console.log(
        "Structural:",
        result.structuralCount
    );

    console.log(
        "Neuroimmune:",
        result.neuroimmune
    );

    console.log(
        "Extreme:",
        result.extreme
    );

    console.log(
        "Primary Stage:",
        result.primaryStage
    );

    console.log(
        "Secondary Stage:",
        result.secondaryStage
    );

    console.log(
        "Zone:",
        result.zone
    );


    return {

        markers,

        primaryStage: result.primaryStage,

        secondaryStage: result.secondaryStage,

        zone: result.zone,

        immuneCount: result.immuneCount,

        inflammatoryCount:
            result.inflammatoryCount,

        oxidativeCount:
            result.oxidativeCount,

        structuralCount:
            result.structuralCount,

        neuroimmune:
            result.neuroimmune,

        extreme:
            result.extreme,

        col1a1Elevated:
            result.col1a1Elevated,

        // Compatibility with existing app.js
        stage: result.primaryStage,

        state:
            `Stage ${result.primaryStage}`

    };

}


/* ===========================================
   EXPORT
=========================================== */

window.runTCPM = runTCPM;