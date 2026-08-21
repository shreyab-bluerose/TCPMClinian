/* =========================================================
   TCPM RECOMMENDATIONS ENGINE
========================================================= */

function buildRecommendations(result, context = {}) {

    if (!result) {
        return [];
    }

    const stages = [];

    const primaryStage = Number(
        result.primaryStage ??
        result.stage
    );

    const secondaryStage = Number(
        result.secondaryStage
    );

    if (Number.isFinite(primaryStage)) {
        stages.push(primaryStage);
    }

    if (
        Number.isFinite(secondaryStage) &&
        secondaryStage !== primaryStage
    ) {
        stages.push(secondaryStage);
    }


    const recommendations = [];


    stages.forEach(stage => {

        const list =
            recommendationLibrary[`Stage ${stage}`] || [];

        list.forEach(item => {

            recommendations.push({
                ...item,
                priorityStage: stage
            });

        });

    });


    /* Remove duplicates */

    const seen = new Set();

    const unique =
        recommendations.filter(item => {

            const key =
                item.title.trim().toLowerCase();

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);
            return true;

        });


    /* Primary stage first */

    unique.sort((a, b) => {

        if (
            a.priorityStage !==
            b.priorityStage
        ) {

            return stages.indexOf(
                a.priorityStage
            ) -
            stages.indexOf(
                b.priorityStage
            );

        }

        const strength = {
            "Strong": 1,
            "Moderate": 2,
            "Clinical consideration": 3
        };

        return (
            (strength[a.evidence] || 99) -
            (strength[b.evidence] || 99)
        );

    });


    return unique;
}


/* =========================================================
   RENDER
========================================================= */

function renderRecommendations(
    recommendations
) {

    const container =
        document.getElementById(
            "recommendationList"
        );

    if (!container) {
        console.error(
            "recommendationList not found"
        );
        return;
    }


    container.innerHTML = "";


    if (
        !recommendations ||
        recommendations.length === 0
    ) {

        container.innerHTML = `
            <div class="recommendation-empty">
                No stage-specific clinical
                considerations are available
                for this TCPM result.
            </div>
        `;

        return;
    }


    recommendations.forEach(
        (r, index) => {

            container.innerHTML += `

                <div class="recommendation-card">

                    <div class="recommendation-top">

                        <div class="recommendation-number">
                            ${index + 1}
                        </div>

                        <div class="recommendation-content">

                            <div class="recommendation-title">
                                ${r.title}
                            </div>

                            <div class="recommendation-tags">

                                <span class="rec-category">
                                    ${r.category}
                                </span>

                                <span class="rec-strength">
                                    ${r.evidence}
                                </span>

                            </div>

                            <div class="recommendation-mechanism">
                                ${r.mechanism}
                            </div>

                            <div class="recommendation-reference">
                                ${r.reference}
                                ${
                                    r.pmid
                                        ? ` · PMID: ${r.pmid}`
                                        : ""
                                }
                            </div>

                            ${
                                r.flag
                                    ? `
                                    <div class="recommendation-flag">
                                        ${r.flag}
                                    </div>
                                    `
                                    : ""
                            }

                        </div>

                    </div>

                </div>

            `;

        }
    );

}