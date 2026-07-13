// ===========================================
// TCPM Algorithm
// frontend/js/tcpm.js
// Main
runTCPM()

// Data extraction
extractMarkers()
normalizeMarkerName()

// Tier assignment
loadThresholds()
assignTier()
assignAllTiers()

// TCPM axes
computeReservoir()
computeBarrier()
computeCrossing()

// Final scoring
computeState()
computePosition()
computeZone()

// Utility
getTier()
countTierAtLeast()
allTierEqual()
// ===========================================

function runTCPM() {

    const markers = {};

    document.querySelectorAll("[data-marker]").forEach(input => {

        markers[input.dataset.marker] =
            parseFloat(input.value) || 0;

    });

    const summary = {

        immune: 0,
        inflammatory: 0,
        oxidative: 0

    };

    // ----------------------------
    // Immune
    // ----------------------------

    ["MCP1","CD163","IL8","IL17","IFNG","NLRP3","CASP1"].forEach(m => {

        if (markers[m] > 1.4)
            summary.immune++;

    });

    // ----------------------------
    // Inflammatory
    // ----------------------------

    ["IL1B","IL6","IL10","TNFA","TGFB1","CRP","COL1A1"].forEach(m => {

        if (markers[m] > 1.4)
            summary.inflammatory++;

    });

    // ----------------------------
    // Oxidative
    // ----------------------------

    ["HMOX1","COX2","NOS2","CYCS","LDHA","LDHB"].forEach(m => {

        if (markers[m] > 1.4)
            summary.oxidative++;

    });

    let primaryZone = "Stage 1";

    if (summary.inflammatory >= 4)
        primaryZone = "Stage 3";

    else if (summary.immune >= 4)
        primaryZone = "Stage 2";

    else if (summary.oxidative >= 4)
        primaryZone = "Stage 4";

    console.log(markers);
    console.log(summary);
    console.log(primaryZone);

    return {

        markers,
        summary,
        primaryZone

    };
}