/* =========================================================
   TCPM CASE REVIEW
   Dynamic content only.
   Does NOT replace case-review-page HTML.
========================================================= */

console.log("case-review.js loaded");


function buildCaseReview(result, context = {}) {

    if (!result) {
        console.error("buildCaseReview: result is missing");
        return null;
    }


    /* =====================================================
       DATA
    ===================================================== */

    const markers = result.markers || {};

    const primaryStage =
        result.primaryStage ??
        result.stage ??
        null;

    const secondaryStage =
        result.secondaryStage ??
        null;

    const zone =
        result.zone ?? "";


    /* =====================================================
       STAGE NAMES
    ===================================================== */

    const stageNames = {
        1: "Trauma Exposure and Stress Signaling",
        2: "Systemic Inflammatory Reservoir",
        3: "BBB Stress & Neuroimmune Signaling",
        4: "Symptom Prevention Window",
        5: "Symptom Reduction Zone"
    };


    function stageName(stage) {

        if (stage === null || stage === undefined || stage === "") {
            return "—";
        }

        return stageNames[stage] || `Stage ${stage}`;
    }


    /* =====================================================
       SAFE DOM UPDATE
    ===================================================== */

    function setText(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                value ?? "";
        }
    }


    /* =====================================================
       DOMINANT SIGNALS
       Same thresholds used for the dashboard
    ===================================================== */

    const dominantSignals = [];


    if (Number(markers["TNFA"]) > 10) {
        dominantSignals.push(
            `TNF-alpha ${markers["TNFA"]}x`
        );
    }


    if (Number(markers["IL10"]) > 10) {
        dominantSignals.push(
            `IL-10 ${markers["IL10"]}x (compensatory)`
        );
    }


    if (Number(markers["CXCL8"]) > 10) {
        dominantSignals.push(
            `IL-8 ${markers["CXCL8"]}x`
        );
    }


    if (Number(markers["CASP1"]) > 5) {
        dominantSignals.push(
            `CASP1 ${markers["CASP1"]}x`
        );
    }


    if (Number(markers["HMOX1"]) > 2) {
        dominantSignals.push(
            `HMOX1 ${markers["HMOX1"]}x`
        );
    }


    if (Number(markers["LDHB"]) > 2) {
        dominantSignals.push(
            `LDHB ${markers["LDHB"]}x`
        );
    }


    if (Number(markers["IL1B"]) > 1.4) {
        dominantSignals.push(
            `IL-1B ${markers["IL1B"]}x`
        );
    }


    if (
        Number(markers["NLRP3"]) > 1.4 &&
        Number(markers["CASP1"]) > 1.4 &&
        Number(markers["IL1B"]) > 1.4
    ) {

        dominantSignals.push(
            "NLRP3-CASP1-IL-1B pathway active"
        );

    }


    /* =====================================================
       RENDER SIGNAL CHIPS
    ===================================================== */

    const signalContainer =
        document.getElementById("crSignals");

    if (signalContainer) {

        signalContainer.innerHTML = "";

        if (dominantSignals.length === 0) {

            const chip =
                document.createElement("span");

            chip.className =
                "signal-chip";

            chip.textContent =
                "No dominant threshold-defined signals";

            signalContainer.appendChild(chip);

        } else {

            dominantSignals.forEach(signal => {

                const chip =
                    document.createElement("span");

                chip.className =
                    "signal-chip";

                chip.textContent =
                    signal;

                signalContainer.appendChild(chip);

            });

        }

    }


    /* =====================================================
       SECTION 1 SUMMARY
    ===================================================== */

    let signalSummary =
        "The panel does not show threshold-defined dominant signals.";

    if (dominantSignals.length > 0) {

        signalSummary =
            `The panel contains ${dominantSignals.length} `
            + `threshold-defined dominant signal`
            + `${dominantSignals.length === 1 ? "" : "s"}.`;

    }


    setText(
        "crSummary",
        signalSummary
    );


    /* =====================================================
       SECTION 2 - STAGE
    ===================================================== */

    setText(
        "crPrimaryStage",
        `Primary: Stage ${
            primaryStage ?? "—"
        } — ${stageName(primaryStage)}${
            zone ? ` (${zone})` : ""
        }`
    );


    let primaryReason =
        "The primary TCPM stage is based on the calculated biomarker pattern.";


    if (
        dominantSignals.includes(
            "NLRP3-CASP1-IL-1B pathway active"
        )
    ) {

        primaryReason =
            "The NLRP3-CASP1-IL-1B pathway is active across the measured pattern, providing biological context for the calculated TCPM stage.";

    }
    else if (
        Number(markers["TNFA"]) > 10
    ) {

        primaryReason =
            "Marked TNF-alpha elevation contributes to the dominant inflammatory signal pattern associated with the calculated TCPM stage.";

    }


    setText(
        "crPrimaryReason",
        primaryReason
    );


    if (secondaryStage) {

        setText(
            "crSecondaryStage",
            `Secondary: Stage ${
                secondaryStage
            } — ${stageName(secondaryStage)}`
        );

        setText(
            "crSecondaryReason",
            "Additional features are present alongside the primary TCPM pattern."
        );

    } else {

        setText(
            "crSecondaryStage",
            ""
        );

        setText(
            "crSecondaryReason",
            ""
        );

    }


    /* =====================================================
       SECTION 3-BUCKETS: OBSERVED
    ===================================================== */

    const observedParts = [];


    if (dominantSignals.length > 0) {

        observedParts.push(
            `Threshold-defined dominant signals include ${dominantSignals.join(", ")}.`
        );

    } else {

        observedParts.push(
            "No threshold-defined dominant signals were identified."
        );

    }


    observedParts.push(
        `The calculated TCPM pattern corresponds to ${
            primaryStage !== null
                ? `Stage ${primaryStage}`
                : "the current calculated stage"
        }${zone ? ` in the ${zone}` : ""}.`
    );


    setText(
        "crObserved",
        observedParts.join(" ")
    );


    /* =====================================================
       SECTION 3-BUCKETS: INTERPRETATION
    ===================================================== */

    let interpretation =
        `These findings may be consistent with ${
            primaryStage !== null
                ? `a ${stageName(primaryStage)} pattern`
                : "the calculated TCPM pattern"
        }.`;

    if (Number(markers["IL10"]) > 10) {

        interpretation +=
            " Elevated IL-10 may reflect compensatory anti-inflammatory signaling within the broader pattern.";

    }


    setText(
        "crInterpretation",
        interpretation
    );


    /* =====================================================
       SECTION 3-BUCKETS: UNCERTAINTY
    ===================================================== */

    setText(
        "crUncertainty",
        "These findings are not specific to a single cause and should be interpreted alongside clinical history, symptoms, examination, treatment status, and clinician judgment."
    );


    /* =====================================================
       SECTION 3 - BIOLOGICAL INTERPRETATION
    ===================================================== */

    const biologicalInterpretation =
        `The biomarker pattern may provide additional biological context for the patient's presentation. `
        + `The calculated TCPM position is ${
            result.position !== undefined
                ? Number(result.position).toFixed(1)
                : "—"
        }${zone ? ` within the ${zone}` : ""}. `
        + `These findings should be interpreted as a biological pattern rather than a diagnosis.`;

    setText(
        "crBiologicalInterpretation",
        biologicalInterpretation
    );


    /* =====================================================
       SECTION 4 - STRESS / TRAUMA CONTEXT
    ===================================================== */

    const presentation =
        context.presentation ||
        "the reported clinical presentation";

    const traumaType =
        context.traumaType ||
        "the reported history";

    const treatmentStatus =
        context.treatmentStatus ||
        "the current treatment status";


    const traumaContext =
        `In the context of ${presentation}, `
        + `with ${traumaType} history and current treatment status of ${treatmentStatus}, `
        + `the biological pattern may provide additional context for clinical formulation. `
        + `The biomarker findings do not establish the presence, timing, or cause of trauma or stress exposure.`;

    setText(
        "crTraumaContext",
        traumaContext
    );


    /* =====================================================
       SECTION 5 - SUPPORTIVE CONSIDERATIONS
    ===================================================== */

    const supportiveCare =
        `Clinical considerations should be determined by the treating clinician `
        + `in the context of the complete patient presentation, symptoms, history, `
        + `current therapy, comorbidities, and medications. `
        + `TCPM findings should support clinical judgment rather than replace it.`;

    setText(
        "crSupportiveCare",
        supportiveCare
    );


    /* =====================================================
       SECTION 6 - REMAINING UNCERTAINTY
    ===================================================== */

    const remainingUncertainty =
        "TCPM staging is a pattern-based interpretation and is not a diagnostic category. "
        + "Biomarker measurements represent a biological snapshot and should be interpreted "
        + "alongside the patient's full clinical presentation and other relevant information.";

    setText(
        "crRemainingUncertainty",
        remainingUncertainty
    );


    /* =====================================================
       RETURN REVIEW OBJECT
       Useful for future rendering / recommendations
    ===================================================== */

    return {

        primaryStage,

        secondaryStage,

        zone,

        dominantSignals,

        observedFindings:
            observedParts.join(" "),

        interpretation,

        uncertainty:
            "These findings are not specific to a single cause and should be interpreted alongside clinical history, symptoms, examination, treatment status, and clinician judgment.",

        biologicalInterpretation,

        traumaContext,

        supportiveCare,

        remainingUncertainty

    };

}