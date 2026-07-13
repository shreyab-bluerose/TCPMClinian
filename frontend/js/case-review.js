// ===========================================
// Case Review Engine
// frontend/js/case-review.js
// ===========================================
console.log("case-review.js loaded");
function buildCaseReview(result) {

    const dominantSignals = [];

    if (result.markers.TNFA > 1.4)
        dominantSignals.push(`TNF-alpha ${result.markers.TNFA}x`);

    if (result.markers.IL10 > 1.4)
        dominantSignals.push(`IL-10 ${result.markers.IL10}x`);

    if (result.markers.IL8 > 1.4)
        dominantSignals.push(`IL-8 ${result.markers.IL8}x`);

    if (result.markers.CASP1 > 1.4)
        dominantSignals.push(`CASP1 ${result.markers.CASP1}x`);

    if (result.markers.HMOX1 > 1.4)
        dominantSignals.push(`HMOX1 ${result.markers.HMOX1}x`);

    if (result.markers.LDHB > 1.4)
        dominantSignals.push(`LDHB ${result.markers.LDHB}x`);

    if (
        result.markers.NLRP3 > 1.4 &&
        result.markers.CASP1 > 1.4 &&
        result.markers.IL1B > 1.4
    ) {
        dominantSignals.push(
            "NLRP3-CASP1-IL1B pathway active"
        );
    }

    return {

        dominantSignals,

        primaryStage: result.state,

        secondaryStage: result.zone,

        observedFindings:
            `Immune activation and inflammatory signalling show elevation. Dominant TCPM position ${result.position.toFixed(1)}.`,

        interpretation:
            `${result.state} appears most consistent with the current biomarker pattern. Reservoir=${result.reservoir}, Barrier=${result.barrier}, Crossing=${result.crossing}.`,

        uncertainty:
            "These findings must always be interpreted with clinical history and are not diagnostic."

    };
}



function renderCaseReview(review) {

    document.getElementById("crPrimaryStage").textContent =
        review.primaryStage;

    document.getElementById("crSecondaryStage").textContent =
        review.secondaryStage;

    document.getElementById("crObserved").textContent =
        review.observedFindings;

    document.getElementById("crInterpretation").textContent =
        review.interpretation;

    document.getElementById("crUncertainty").textContent =
        review.uncertainty;

    const chips =
        document.getElementById("crSignals");

    chips.innerHTML = "";

    review.dominantSignals.forEach(signal => {

        const span =
            document.createElement("span");

        span.className = "signal-chip";

        span.textContent = signal;

        chips.appendChild(span);

    });

}