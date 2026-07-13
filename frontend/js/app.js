// 

document.addEventListener("DOMContentLoaded", () => {

    const clinicalPage = document.getElementById("clinical-context-page");
    const panelPage = document.getElementById("panel-entry-page");
    const overviewPage = document.getElementById("overview-page");

    const navClinical = document.getElementById("navClinical");
    const navPanel = document.getElementById("navPanel");
    const navOverview = document.getElementById("navOverview");

    const saveBtn = document.getElementById("saveBtn");
    const backBtn = document.getElementById("backBtn");
    const runBtn = document.querySelector(".run-btn");
    


    const caseReviewPage =
        document.getElementById("case-review-page");

    const navCaseReview =
        document.getElementById("navCaseReview");

    const caseReviewBtn =
        document.getElementById("caseReviewBtn");

    const recommendationsPage =
        document.getElementById("recommendations-page");

    const navRecommendations =
        document.getElementById("navRecommendations");

    const recommendationsBtn =
        document.getElementById("recommendationsBtn");



    function showClinical() {

        clinicalPage.style.display = "block";
        panelPage.style.display = "none";
        overviewPage.style.display = "none";
        caseReviewPage.style.display = "none";
        if (recommendationsPage) recommendationsPage.style.display = "none";

        navClinical.classList.add("active");
        navPanel.classList.remove("active");
        navOverview.classList.remove("active");
        navCaseReview.classList.remove("active");
        if (navRecommendations) navRecommendations.classList.remove("active");
    }

    function showPanel() {

        clinicalPage.style.display = "none";
        panelPage.style.display = "block";
        overviewPage.style.display = "none";
        caseReviewPage.style.display = "none";
        if (recommendationsPage) recommendationsPage.style.display = "none";

        navClinical.classList.remove("active");
        navPanel.classList.add("active");
        navOverview.classList.remove("active");
        navCaseReview.classList.remove("active");
        if (navRecommendations) navRecommendations.classList.remove("active");
    }

    function showOverview() {

        clinicalPage.style.display = "none";
        panelPage.style.display = "none";
        overviewPage.style.display = "block";
        caseReviewPage.style.display = "none";
        if (recommendationsPage) recommendationsPage.style.display = "none";

        navClinical.classList.remove("active");
        navPanel.classList.remove("active");
        navOverview.classList.add("active");
        navCaseReview.classList.remove("active");
        if (navRecommendations) navRecommendations.classList.remove("active");
    }

    function showCaseReview() {

        clinicalPage.style.display = "none";
        panelPage.style.display = "none";
        overviewPage.style.display = "none";
        caseReviewPage.style.display = "block";
        if (recommendationsPage) recommendationsPage.style.display = "none";

        navClinical.classList.remove("active");
        navPanel.classList.remove("active");
        navOverview.classList.remove("active");
        navCaseReview.classList.add("active");
        if (navRecommendations) navRecommendations.classList.remove("active");
    }

    function showRecommendations() {

        clinicalPage.style.display = "none";
        panelPage.style.display = "none";
        overviewPage.style.display = "none";
        caseReviewPage.style.display = "none";
        if (recommendationsPage) recommendationsPage.style.display = "block";

        navClinical.classList.remove("active");
        navPanel.classList.remove("active");
        navOverview.classList.remove("active");
        navCaseReview.classList.remove("active");
        if (navRecommendations) navRecommendations.classList.add("active");
    }



    saveBtn.addEventListener("click", showPanel);

    navClinical.addEventListener("click", showClinical);

    navPanel.addEventListener("click", showPanel);

    navOverview.addEventListener("click", showOverview);

    backBtn.addEventListener("click", showClinical);


    navCaseReview.addEventListener("click", showCaseReview);

    if (caseReviewBtn) {
        caseReviewBtn.addEventListener("click", showCaseReview);
    }

    if (navRecommendations) {
        navRecommendations.addEventListener("click", showRecommendations);
    }
    if (recommendationsBtn) {
        recommendationsBtn.addEventListener("click", showRecommendations);
    }

    runBtn.addEventListener("click", () => {

        const result = runTCPM();

        const review =
            buildCaseReview(result);

        renderCaseReview(review);

        const recommendations =
            buildRecommendations(result);

        console.log(result.state);
        console.log(recommendations);
        renderRecommendations(recommendations);

        document.getElementById("stageTitle").textContent = result.state;
        document.getElementById("stageSubtitle").textContent = result.zone;
        document.getElementById("stageQuestion").textContent =
            `Reservoir ${result.reservoir} | Barrier ${result.barrier} | Crossing ${result.crossing}`;

        document.getElementById("primaryBadge").textContent = result.state;
        document.getElementById("secondaryBadge").textContent = result.zone;
        document.getElementById("narrative").textContent =
            `${result.state} | Position ${result.position.toFixed(1)}`;

        document.getElementById("reservoirLevel").textContent = result.reservoir;
        document.getElementById("reservoirScore").textContent = "0-3";

        document.getElementById("barrierLevel").textContent = result.barrier;
        document.getElementById("barrierScore").textContent = "0-3";

        document.getElementById("crossingLevel").textContent = result.crossing;
        document.getElementById("crossingScore").textContent = "0-3";

        document.getElementById("positionValue").textContent = result.position.toFixed(1);
        document.getElementById("zoneValue").textContent = result.zone;

        document.getElementById("pathwayFlag").textContent =
            `Crossing = ${result.crossing}`;

        document.getElementById("regulatoryFlag").textContent =
            `Reservoir = ${result.reservoir}, Barrier = ${result.barrier}`;

        document.getElementById("signalChips").innerHTML = "";

        showOverview();

    });

    showClinical();

});