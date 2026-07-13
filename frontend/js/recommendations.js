// ===========================================
// Recommendations Engine
// frontend/js/recommendations.js
// ===========================================

// function buildRecommendations(result) {

//     const recommendations = [];

//     if (result.state.includes("Stage 3")) {

//         recommendations.push({
//             title: "Pacing of trauma processing work",
//             category: "Neuroimmune",
//             evidence: "Strong",
//             mechanism:
//                 "BBB stress and neuroimmune pathway activation indicates regulation capacity should precede processing depth.",
//             reference:
//                 "Bisson et al. (2007)",
//             flag:
//                 "Monitor post-session for cognitive fog, sensory overload, symptom escalation."
//         });

//         recommendations.push({
//             title: "Vagal breathing - 5–6 breaths/min",
//             category: "Neuroimmune",
//             evidence: "Moderate",
//             mechanism:
//                 "Supports vagal tone and anti-inflammatory signalling.",
//             reference:
//                 "Thayer & Lane (2009)",
//             flag: ""
//         });

//         recommendations.push({
//             title: "Omega-3 fatty acids (EPA/DHA)",
//             category: "Inflammatory",
//             evidence: "Strong",
//             mechanism:
//                 "Supports BBB integrity and reduces inflammatory signalling.",
//             reference:
//                 "Kayvani et al. (2022)",
//             flag:
//                 "Discuss with primary care or prescribing physician."
//         });

//         recommendations.push({
//             title: "Sleep prioritization",
//             category: "Oxidative",
//             evidence: "Strong",
//             mechanism:
//                 "Supports glymphatic clearance and recovery.",
//             reference:
//                 "Walker (2017)",
//             flag: ""
//         });

//     }

//     return recommendations;

// }
console.log("recommendations.js loaded");

function buildRecommendations(result) {

    if (result.state.includes("Green"))
        return recommendationLibrary["Stage 1"];

    if (result.state.includes("Yellow"))
        return recommendationLibrary["Stage 2"];

    if (result.state.includes("Orange"))
        return recommendationLibrary["Stage 3"];

    if (result.state.includes("Red"))
        return recommendationLibrary["Stage 4"];

    if (result.state.includes("Reduction"))
        return recommendationLibrary["Stage 5"];

    return [];
}

function renderRecommendations(list) {

    const container =
        document.getElementById("recommendationList");

    container.innerHTML = "";

    list.forEach((item, index) => {

        container.innerHTML += `

        <div class="recommendation-card">

            <div class="recommendation-title">
                <span class="case-number">${index + 1}</span>
                ${item.title}
            </div>

            <div class="recommendation-tags">

                <span class="badge primary">
                    ${item.category}
                </span>

                <span class="badge secondary">
                    ${item.evidence}
                </span>

            </div>

            <p>${item.mechanism}</p>

            <small>${item.reference}</small>

            ${
                item.flag
                ? `<div class="alert-box danger">${item.flag}</div>`
                : ""
            }

        </div>

        `;

    });

}