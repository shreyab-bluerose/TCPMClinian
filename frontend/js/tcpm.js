// ===========================================
// TCPM Algorithm
// frontend/js/tcpm.js
// ===========================================
console.log("NEW TCPM RUNNING");
// Paste ALL thresholds from threshold_nos.xlsx here
const THRESHOLDS = {

    CCL2:   { T2: 1.40, T3: 9.60,   T4: 25.0625 },
    CD163:  { T2: 1.40, T3: 6.40,   T4: 19.40 },

    CXCL8:  { T2: 1.40, T3: 7.02,   T4: 29.18 },
    IL17:   { T2: 1.40, T3: 29.20,  T4: 129.0125 },
    IFNG:   { T2: 1.40, T3: 6.75,   T4: 15.4375 },

    NLRP3:  { T2: 1.40, T3: 5.02,   T4: 9.31 },
    CASP1:  { T2: 1.40, T3: 4.95,   T4: 13.4125 },

    IL1B:   { T2: 1.40, T3: 5.30,   T4: 15.28 },
    IL6:    { T2: 1.40, T3: 7.10,   T4: 18.62 },
    IL10:   { T2: 1.40, T3: 28.82,  T4: 191.68 },

    TNFA:   { T2: 1.40, T3: 11.38,  T4: 37.78 },
    TGFB1:  { T2: 1.40, T3: 6.74,   T4: 17.63 },
    CRP:    { T2: 1.40, T3: 6.76,   T4: 17.30 },

    COL1A1: { T2: 1.40, T3: 5.42,   T4: 10.26 },
    HMOX1:  { T2: 1.40, T3: 14.62,  T4: 60.39 },

    COX2:   { T2: 1.40, T3: 8.52,   T4: 20.58 },
    NOS2:   { T2: 1.40, T3: 135.68, T4: 571.16 },

    CYCS:   { T2: 1.40, T3: 16.85,  T4: 47.6375 },
    LDHA:   { T2: 1.40, T3: 8.42,   T4: 19.95 },
    LDHB:   { T2: 1.40, T3: 4.30,   T4: 9.05 },

    IL18:   { T2: 1.40, T3: 3.49,   T4: 7.8525 },

    TLR4:   { T2: 1.40, T3: 5.79,   T4: 7.8325 },
    MMP9:   { T2: 1.40, T3: 8.73,   T4: 13.5525 },
    TIMP1:  { T2: 1.40, T3: 4.06,   T4: 4.8625 },

    // Not available in threshold file
    IL1RN: null

};

function loadThresholds() {

    return THRESHOLDS;

}


// ===========================================
// Main
// ===========================================

// function runTCPM() {

//     loadThresholds();

//     const markers = extractMarkers();

//     const tiers = assignAllTiers(markers);

//     console.log("Markers:", markers);
//     console.log("Tiers:", tiers);

//     // Part 2
//     // const reservoir = computeReservoir(tiers);
//     // const barrier = computeBarrier(tiers);

//     // Part 3
//     // const crossing = computeCrossing(tiers);
//     // const state = computeState(reservoir, barrier);
//     // const position = computePosition(reservoir, barrier, crossing);
//     // const zone = computeZone(position);

//     return {

//         markers,
//         tiers

//         // reservoir,
//         // barrier,
//         // crossing,
//         // state,
//         // position,
//         // zone

//     };

// }


// ===========================================
// Read markers
// ===========================================

function extractMarkers() {

    const markers = {};

    document.querySelectorAll("[data-marker]").forEach(input => {

        const marker = normalizeMarkerName(input.dataset.marker);

        markers[marker] = parseFloat(input.value) || 0;

    });

    return markers;

}


// ===========================================
// Normalize marker names
// ===========================================

function normalizeMarkerName(marker) {

    const aliases = {

        "TNF-α": "TNFA",
        "TNFA": "TNFA",

        "IL-1β": "IL1B",
        "IL1B": "IL1B",

        "IL18": "IL18",

        "IL-6": "IL6",
        "IL6": "IL6",

        "IL-8": "CXCL8",
        "IL8": "CXCL8",
        "CXCL8": "CXCL8",

        "MCP-1": "CCL2",
        "MCP1": "CCL2",
        "CCL2": "CCL2",

        "CRP": "CRP",

        "IL-10": "IL10",
        "IL10": "IL10",

        "IL1RN": "IL1RN",

        "CD163": "CD163",

        "HMOX1": "HMOX1",

        "NLRP3": "NLRP3",

        "CASP1": "CASP1",

        "IFNG": "IFNG",
        "IFNγ": "IFNG",
        "IFN-G": "IFNG",

        "IL17": "IL17",

        "NOS2": "NOS2",

        "TGFB1": "TGFB1",

        "COL1A1": "COL1A1",

        "COX2": "COX2",
        "COX-2": "COX2",

        "CYCS": "CYCS",

        "LDHA": "LDHA",

        "LDHB": "LDHB"

    };

    return aliases[marker] || marker;

}


// ===========================================
// Tier Assignment
// ===========================================

function assignTier(marker, value) {

    const t = THRESHOLDS[marker];

    if (!t)
        return "T1";

    if (value >= t.T4)
        return "T4";

    if (value >= t.T3)
        return "T3";

    if (value >= t.T2)
        return "T2";

    return "T1";

}


function assignAllTiers(markers) {

    const tiers = {};

    Object.keys(markers).forEach(marker => {

        tiers[marker] = assignTier(marker, markers[marker]);

    });

    return tiers;

}

// ===========================================
// Reservoir Axis
// ===========================================

function computeReservoir(tiers) {

    const drivers = [
        "TNFA",
        "IL1B",
        "IL18",
        "CXCL8",
        "CCL2",
        "IL6",
        "CRP"
    ];

    const regulatory = [
        "IL10",
        "IL1RN",
        "CD163"
    ];

    const driverT2 = countTierAtLeast(drivers, tiers, "T2");
    const driverT3 = countTierAtLeast(drivers, tiers, "T3");

    const regLow = allTierEqual(regulatory, tiers, "T1");

    if (
        tiers["TNFA"] === "T4" ||
        driverT3 >= 3 ||
        (driverT2 >= 3 && regLow)
    ) {
        return 3;
    }

    if (
        driverT3 >= 1 ||
        driverT2 >= 2
    ) {
        return 2;
    }

    if (driverT2 === 1) {
        return 1;
    }

    return 0;

}


// ===========================================
// Barrier Axis
// ===========================================

function computeBarrier(tiers) {

    const hmox1 = getTier(tiers["HMOX1"]);
    const il1b = getTier(tiers["IL1B"]);

    if (hmox1 === 4 && il1b >= 2)
        return 3;

    if (hmox1 === 3 && il1b >= 2)
        return 2;

    if (hmox1 === 2 || il1b >= 2)
        return 1;

    return 0;

}


// ===========================================
// Helper Functions
// ===========================================

function getTier(tier) {

    switch (tier) {

        case "T4": return 4;
        case "T3": return 3;
        case "T2": return 2;
        default: return 1;

    }

}


function countTierAtLeast(markers, tiers, minimumTier) {

    const min = getTier(minimumTier);

    let count = 0;

    markers.forEach(marker => {

        if (getTier(tiers[marker]) >= min)
            count++;

    });

    return count;

}


function allTierEqual(markers, tiers, tier) {

    return markers.every(marker => tiers[marker] === tier);

}

// ===========================================
// Crossing Axis
// ===========================================

function computeCrossing(tiers) {

    const inflammasome = [
        "NLRP3",
        "CASP1",
        "IL1B"
    ];

    const inflammasomeN = countTierAtLeast(
        inflammasome,
        tiers,
        "T2"
    );

    const neuroCo =
        Math.max(
            getTier(tiers["CXCL8"]),
            getTier(tiers["CCL2"])
        ) >= 2;

    const neuroDirect =
        Math.max(
            getTier(tiers["IFNG"]),
            getTier(tiers["CCL2"])
        );

    if (
        (inflammasomeN === 3 && neuroCo) ||
        neuroDirect === 4
    ) {
        return 3;
    }

    if (
        inflammasomeN >= 2 ||
        neuroDirect === 3
    ) {
        return 2;
    }

    if (
        inflammasomeN === 1 ||
        neuroDirect === 2
    ) {
        return 1;
    }

    return 0;

}


// ===========================================
// State
// ===========================================

function computeState(reservoir, barrier) {

    const systemicElevated = reservoir >= 2;
    const barrierPresent = barrier >= 2;

    if (!systemicElevated && !barrierPresent)
        return "Non-inflammatory (Green)";

    if (systemicElevated && !barrierPresent)
        return "Chronic Stress Inflammation (Yellow)";

    if (!systemicElevated && barrierPresent)
        return "Barrier Stress (Orange)";

    return "Systemic + Barrier (Red)";

}


// ===========================================
// Position
// ===========================================

function computePosition(
    reservoir,
    barrier,
    crossing
) {

    const raw =
        (reservoir / 3) * 35 +
        (barrier / 3) * 35 +
        (crossing / 3) * 30;

    if (crossing <= 1)
        return Math.min(raw, 75);

    return raw;

}


// ===========================================
// Zone
// ===========================================

function computeZone(position) {

    if (position <= 25)
        return "Well Managed";

    if (position <= 50)
        return "Prevention";

    if (position <= 75)
        return "Reduction";

    return "Crisis";

}

function runTCPM() {

    // Load thresholds
    loadThresholds();

    // Extract biomarker values
    const markers = extractMarkers();

    // Convert to T1-T4
    const tiers = assignAllTiers(markers);

    // Compute TCPM axes
    const reservoir = computeReservoir(tiers);
    const barrier = computeBarrier(tiers);
    const crossing = computeCrossing(tiers);

    // Compute final outputs
    const state = computeState(reservoir, barrier);
    const position = computePosition(
        reservoir,
        barrier,
        crossing
    );
    const zone = computeZone(position);

    const immuneCount = countElevated([
        "MCP1","CD163","IL8","IL17","IFNG","NLRP3","CASP1"
    ], markers);

    const inflammatoryCount = countElevated([
        "IL1B","IL6","IL10","TNFA","TGFB1","CRP","COL1A1"
    ], markers);

    const oxidativeCount = countElevated([
        "HMOX1","COX2","NOS2","CYCS","LDHA","LDHB"
    ], markers);

    console.log("Markers:", markers);
    console.log("Tiers:", tiers);
    console.log("Reservoir:", reservoir);
    console.log("Barrier:", barrier);
    console.log("Crossing:", crossing);
    console.log("State:", state);
    console.log("Position:", position);
    console.log("Zone:", zone);

    return {
        markers,
        tiers,
        reservoir,
        barrier,
        crossing,
        state,
        position,
        zone,
        immuneCount,
        inflammatoryCount,
        oxidativeCount ,
        markers
    };

}

function countElevated(markerList, markers) {

    return markerList.filter(marker =>
        (markers[normalizeMarkerName(marker)] || 0) > 1.4
    ).length;

}