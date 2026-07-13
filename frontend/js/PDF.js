// =====================================================
// PDF Upload + Biomarker Extraction
// =====================================================

if (typeof pdfjsLib !== "undefined") {

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js";

    const pdfUpload = document.getElementById("pdfUpload");

    if (pdfUpload) {
        pdfUpload.addEventListener("change", handlePDFUpload);
    }
}

async function handlePDFUpload(event) {

    const file = event.target.files[0];

    if (!file) return;

    try {

        const arrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;

        const firstPage = await pdf.getPage(1);

        const textContent =
            await firstPage.getTextContent();

        const text = textContent.items
            .map(item => item.str)
            .join(" ");

        console.log(text);

        extractBiomarkers(text);

    } catch (err) {

        console.error("PDF Error:", err);

        alert(
            "Unable to read PDF. Please upload a valid report."
        );
    }
}

function extractBiomarkers(text) {

    const markerMap = {
        "IL-6": "IL6",
        "TNF-α": "TNFA",
        "IL-8": "IL8",
        "IL-1β": "IL1B",
        "MCP-1": "MCP1",
        "CRP": "CRP",
        "IL-10": "IL10",
        "IFNG": "IFNG",
        "IL-17": "IL17",
        "CD163": "CD163",
        "NOS2": "NOS2",
        "TGFB1": "TGFB1",
        "COL1A1": "COL1A1",
        "HMOX1": "HMOX1",
        "COX-2": "COX2",
        "NLRP3": "NLRP3",
        "CASP1": "CASP1",
        "CYCS": "CYCS",
        "LDH A": "LDHA",
        "LDH B": "LDHB"
    };

    Object.entries(markerMap).forEach(([pdfMarker, htmlMarker]) => {

        const escaped =
            pdfMarker.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

        const regex = new RegExp(
            `${escaped}\\s+([0-9]+(?:\\.[0-9]+)?)\\s+0\\.0\\s+to\\s+1\\.4`,
            "i"
        );

        const match = text.match(regex);

        if (!match) {
            console.log("Not found:", pdfMarker);
            return;
        }

        const value = parseFloat(match[1]);

        console.log(
            pdfMarker,
            "=>",
            value
        );

        populateMarker(
            htmlMarker,
            value
        );
    });
}

function populateMarker(markerName, value) {

    const input = document.querySelector(
        `[data-marker="${markerName}"]`
    );

    if (!input) return;

    input.value = value;

    const row = input.closest("tr");

    const statusCell =
        row.querySelector(".status");

    if (!statusCell) return;

    if (value > 1.4) {

        statusCell.textContent = "Elevated";
        statusCell.style.color = "#d32f2f";
        statusCell.style.fontWeight = "600";

    } else {

        statusCell.textContent = "Within range";
        statusCell.style.color = "#2e7d32";
        statusCell.style.fontWeight = "600";
    }

    console.log(
        "Updating:",
        markerName,
        value
    );
}