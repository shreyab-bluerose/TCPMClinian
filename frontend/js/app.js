document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       PAGE ELEMENTS
    ========================================================= */

    const pages = {
        clinical: document.getElementById("clinical-context-page"),
        panel: document.getElementById("panel-entry-page"),
        overview: document.getElementById("overview-page"),
        caseReview: document.getElementById("case-review-page"),
        recommendations: document.getElementById("recommendations-page"),
        patientReport: document.getElementById("patient-report-page")
    };


    /* =========================================================
       NAVIGATION ELEMENTS
    ========================================================= */

    const nav = {
        clinical: document.getElementById("navClinical"),
        panel: document.getElementById("navPanel"),
        overview: document.getElementById("navOverview"),
        caseReview: document.getElementById("navCaseReview"),
        recommendations: document.getElementById("navRecommendations"),
        patientReport: document.getElementById("navPatientReport")
    };


    /* =========================================================
       BUTTONS
    ========================================================= */

    const saveBtn = document.getElementById("saveBtn");
    const backBtn = document.getElementById("backBtn");

    const runBtn = document.querySelector(".run-btn");

    const caseReviewBtn =
        document.getElementById("caseReviewBtn");

    const recommendationsBtn =
        document.getElementById("recommendationsBtn");

    const patientReportBtn =
        document.getElementById("patientReportBtn");


    /* =========================================================
       PAGE SWITCHING
    ========================================================= */

    function hideAllPages() {

        Object.values(pages).forEach(page => {

            if (page) {
                page.style.display = "none";
            }

        });

    }


    function clearActiveNavigation() {

        Object.values(nav).forEach(item => {

            if (item) {
                item.classList.remove("active");
            }

        });

    }


    function showPage(pageName) {

        hideAllPages();
        clearActiveNavigation();

        const page = pages[pageName];

        if (!page) {
            console.error("TCPM page not found:", pageName);
            return;
        }

        page.style.display = "block";

        const navItem = nav[pageName];

        if (navItem) {
            navItem.classList.add("active");
        }

        console.log("Showing page:", pageName);
    }


    /* =========================================================
       PAGE HELPERS
    ========================================================= */

    function showClinical() {
        showPage("clinical");
    }

    function showPanel() {
        showPage("panel");
    }

    function showOverview() {
        showPage("overview");
    }

    function showCaseReview() {
        showPage("caseReview");
        // clinicalPage.style.display = "none";
        // panelPage.style.display = "none";
        // overviewPage.style.display = "none";
        // recommendationsPage.style.display = "none";
        // patientReportPage.style.display = "none";

        // caseReviewPage.style.display = "block";

        // // caseReviewPage.classList.add("case-review-active");

        // navClinical.classList.remove("active");
        // navPanel.classList.remove("active");
        // navOverview.classList.remove("active");
        // navCaseReview.classList.add("active");

        // if (navRecommendations)
        //     navRecommendations.classList.remove("active");
    }

    function showRecommendations() {
        showPage("recommendations");
    }

    function showPatientReport() {
        showPage("patientReport");
    }


    /* =========================================================
       OVERVIEW
    ========================================================= */

    function populateOverview(result) {

        if (!result) {
            console.error(
                "populateOverview: result is missing"
            );
            return;
        }


        /* -----------------------------------------------------
           STAGE
        ----------------------------------------------------- */

        const stageTitle =
            document.getElementById("stageTitle");

        if (stageTitle) {
            stageTitle.textContent =
                `Stage ${result.primaryStage ?? "—"}`;
        }


        const stageSubtitle =
            document.getElementById("stageSubtitle");

        if (stageSubtitle) {
            stageSubtitle.textContent =
                `${result.zone ?? "—"} Zone`;
        }

        /* STAGE DOT COLOR */
        const dot = document.getElementById("stageDot");

        if (dot) {
            dot.className = "stage-dot";

            const zone = (result.zone || "").toLowerCase();

            if (zone.includes("green")) {
                dot.classList.add("green");
            }
            else if (zone.includes("yellow")) {
                dot.classList.add("yellow");
            }
            else if (zone.includes("orange")) {
                dot.classList.add("orange");
            }
            else if (zone.includes("red")) {
                dot.classList.add("red");
            }
            else if (zone.includes("purple")) {
                dot.classList.add("purple");
            }
        }

        const stageQuestion =
            document.getElementById("stageQuestion");

        if (stageQuestion) {

            stageQuestion.textContent =
                "Current TCPM stage based on the available biomarker findings.";

        }


        /* -----------------------------------------------------
           PRIMARY / SECONDARY
        ----------------------------------------------------- */

        const stageNames = {
            1: "Trauma Exposure and Stress Signaling",
            2: "Systemic Inflammatory Reservoir",
            3: "BBB Stress & Neuroimmune Signaling",
            4: "Symptom Prevention Window",
            5: "Symptom Reduction Zone"
        };

        const primaryBadge =
            document.getElementById("primaryBadge");

        if (primaryBadge) {

            const stage = result.primaryStage;

            primaryBadge.textContent =
                `Primary: Stage ${stage ?? "—"}: ${stageNames[stage] ?? ""}`;
        }


        const secondaryBadge =
            document.getElementById("secondaryBadge");

        if (secondaryBadge) {

            secondaryBadge.textContent =
                result.secondaryStage
                    ? `Secondary: Stage ${result.secondaryStage}: ${stageNames[result.secondaryStage] ?? ""}`
                    : "Secondary: None"
                    ;

        }


        /* -----------------------------------------------------
           CATEGORY COUNTS
        ----------------------------------------------------- */

        updateCategory(
            "immune",
            result.immuneCount,
            7
        );

        updateCategory(
            "inflammatory",
            result.inflammatoryCount,
            6
        );

        updateCategory(
            "oxidative",
            result.oxidativeCount,
            6
        );

        updateCategory(
            "structural",
            result.structuralCount,
            1
        );


        /* -----------------------------------------------------
           PATHWAY FLAG
        ----------------------------------------------------- */

        const pathwayFlag =
            document.getElementById("pathwayFlag");

        if (pathwayFlag) {

            pathwayFlag.textContent =
                result.neuroimmune
                    ? "Neuroimmune / BBB pattern detected."
                    : "No neuroimmune / BBB pattern detected.";

        }


        /* -----------------------------------------------------
           REGULATORY FLAG
        ----------------------------------------------------- */

        const regulatoryFlag =
            document.getElementById("regulatoryFlag");

        if (regulatoryFlag) {

            regulatoryFlag.textContent =
                result.extreme
                    ? "Extreme elevation detected."
                    : "No extreme elevation detected.";

        }


        /* -----------------------------------------------------
           DOMINANT SIGNALS
        ----------------------------------------------------- */

        // const signalChips =
        //     document.getElementById("signalChips");

        // if (signalChips) {

        //     signalChips.innerHTML = "";

        //     const signals = [];

        //     if (Number(result.immuneCount) > 0) {
        //         signals.push("Immune Activation");
        //     }

        //     if (Number(result.inflammatoryCount) > 0) {
        //         signals.push("Inflammatory");
        //     }

        //     if (Number(result.oxidativeCount) > 0) {
        //         signals.push("Oxidative / Metabolic");
        //     }

        //     if (Number(result.structuralCount) > 0) {
        //         signals.push("Structural");
        //     }


        //     signals.forEach(signal => {

        //         const chip =
        //             document.createElement("span");

        //         chip.className =
        //             "signal-chip";

        //         chip.textContent =
        //             signal;

        //         signalChips.appendChild(chip);

        //     });

        // }
        const chips = document.getElementById("signalChips");

        if (chips) {
            chips.innerHTML = "";

            const m = result.markers || {};
            const signals = [];

            if (Number(m["TNFA"]) > 10) {
                signals.push(`TNF-alpha ${m["TNFA"]}x`);
            }

            if (Number(m["IL10"]) > 10) {
                signals.push(`IL-10 ${m["IL10"]}x (compensatory)`);
            }

            if (Number(m["CXCL8"]) > 10) {
                signals.push(`IL-8 ${m["CXCL8"]}x`);
            }

            if (Number(m["CASP1"]) > 5) {
                signals.push(`CASP1 ${m["CASP1"]}x`);
            }

            if (Number(m["HMOX1"]) > 2) {
                signals.push(`HMOX1 ${m["HMOX1"]}x`);
            }

            if (Number(m["LDHB"]) > 2) {
                signals.push(`LDHB ${m["LDHB"]}x`);
            }

            if (Number(m["IL1B"]) > 1.4) {
                signals.push(`IL-1B ${m["IL1B"]}x`);
            }

            if (
                Number(m["NLRP3"]) > 1.4 &&
                Number(m["CASP1"]) > 1.4 &&
                Number(m["IL1B"]) > 1.4
            ) {
                signals.push("NLRP3-CASP1-IL-1B pathway active");
            }

            signals.forEach(signal => {
                chips.innerHTML += `
                    <span class="signal-chip">${signal}</span>
                `;
            });
        }

        /* -----------------------------------------------------
           NARRATIVE
        ----------------------------------------------------- */

        const narrative =
            document.getElementById("narrative");

        if (narrative) {

            narrative.textContent =
                `The biomarker profile corresponds to Stage ${
                    result.primaryStage ?? "—"
                } in the ${
                    result.zone ?? "—"
                } zone.`;

        }

    }


    /* =========================================================
       CATEGORY CARD
    ========================================================= */

    function updateCategory(
        category,
        elevatedCount,
        total
    ) {

        elevatedCount =
            Number(elevatedCount) || 0;

        total =
            Number(total) || 0;


        const percent =
            total > 0
                ? (elevatedCount / total) * 100
                : 0;


        let level = "Minimal";


        if (elevatedCount === 0) {

            level = "Minimal";

        } else if (percent < 33.3) {

            level = "Mild";

        } else if (percent < 66.7) {

            level = "Moderate";

        } else {

            level = "Prominent";

        }


        const levelElement =
            document.getElementById(
                `${category}Level`
            );

        if (levelElement) {
            levelElement.textContent =
                level;
        }


        const countElement =
            document.getElementById(
                `${category}Count`
            );

        if (countElement) {

            countElement.textContent =
                `${elevatedCount} / ${total} elevated`;

        }


        const barElement =
            document.getElementById(
                `${category}Bar`
            );

        if (barElement) {

            barElement.style.width =
                `${percent}%`;

        }

    }


    /* =========================================================
       CLINICAL CONTEXT SUMMARY
    ========================================================= */

    function populateContextSummary(context) {

        const contextSummary =
            document.getElementById(
                "contextSummary"
            );

        if (!contextSummary || !context) {
            return;
        }


        contextSummary.innerHTML = `

            <b>Presentation:</b>
            ${context.presentation ?? "—"}<br>

            <b>Trauma:</b>
            ${context.traumaType ?? "—"}<br>

            <b>Treatment:</b>
            ${context.treatmentStatus ?? "—"}<br>

            <b>Therapy:</b>
            ${context.therapy ?? "—"}<br>

            <b>Comorbidities:</b>
            ${context.comorbidities ?? "—"}<br>

            <b>Medication:</b>
            ${context.medications ?? "—"}

        `;

    }


    /* =========================================================
       EVENT LISTENERS
    ========================================================= */

    if (saveBtn) {
        saveBtn.addEventListener(
            "click",
            showPanel
        );
    }


    if (backBtn) {
        backBtn.addEventListener(
            "click",
            showClinical
        );
    }


    if (nav.clinical) {
        nav.clinical.addEventListener(
            "click",
            showClinical
        );
    }


    if (nav.panel) {
        nav.panel.addEventListener(
            "click",
            showPanel
        );
    }


    if (nav.overview) {
        nav.overview.addEventListener(
            "click",
            showOverview
        );
    }


    if (nav.caseReview) {
        nav.caseReview.addEventListener(
            "click",
            showCaseReview
        );
    }


    if (nav.recommendations) {
        nav.recommendations.addEventListener(
            "click",
            showRecommendations
        );
    }


    if (nav.patientReport) {
        nav.patientReport.addEventListener(
            "click",
            showPatientReport
        );
    }


    if (caseReviewBtn) {

        caseReviewBtn.addEventListener(
            "click",
            showCaseReview
        );

    }


    if (recommendationsBtn) {

        recommendationsBtn.addEventListener(
            "click",
            showRecommendations
        );

    }


    if (patientReportBtn) {

        patientReportBtn.addEventListener(
            "click",
            showPatientReport
        );

    }


    /* =========================================================
       RUN TCPM
    ========================================================= */

    if (runBtn) {

        runBtn.addEventListener(
            "click",
            () => {

                console.log(
                    "========== RUN TCPM =========="
                );


                /* -------------------------------------------------
                   GET CLINICAL CONTEXT
                ------------------------------------------------- */

                let context = {};

                if (
                    typeof getClinicalContext ===
                    "function"
                ) {

                    context =
                        getClinicalContext();

                }


                /* -------------------------------------------------
                   RUN TCPM ENGINE
                ------------------------------------------------- */

                if (
                    typeof runTCPM !==
                    "function"
                ) {

                    console.error(
                        "runTCPM() is not available. Check tcpm.js."
                    );

                    return;
                }


                const result =
                    runTCPM();





                if (!result) {

                    console.error(
                        "TCPM returned no result."
                    );

                    return;
                }


                /* -------------------------------------------------
                   UPDATE CONTEXT
                ------------------------------------------------- */

                populateContextSummary(
                    context
                );


                /* -------------------------------------------------
                   UPDATE OVERVIEW
                ------------------------------------------------- */

                populateOverview(
                    result
                );

                const recommendations = buildRecommendations(result, context);

                renderRecommendations(recommendations);

                /* -------------------------------------------------
                   BUILD CASE REVIEW
                ------------------------------------------------- */

                if (
                    typeof buildCaseReview ===
                    "function"
                ) {

                    try {

                        buildCaseReview(
                            result,
                            context
                        );

                    } catch (error) {

                        console.error(
                            "Case Review error:",
                            error
                        );

                    }

                } else {

                    console.warn(
                        "buildCaseReview() not found."
                    );

                }


                /* -------------------------------------------------
                   SHOW OVERVIEW
                ------------------------------------------------- */

                showOverview();


                console.log(
                    "========== TCPM COMPLETE =========="
                );

            }
        );

    } else {

        console.warn(
            "Run button (.run-btn) not found."
        );

    }


    /* =========================================================
       INITIAL PAGE
    ========================================================= */

    showClinical();

});