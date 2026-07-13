pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const pdfUpload = document.getElementById("pdfUpload");

pdfUpload.addEventListener("change", handlePDFUpload);

async function handlePDFUpload(event) {

    const file = event.target.files[0];

    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;

    const page = await pdf.getPage(1);

    const content = await page.getTextContent();

    const text = content.items
        .map(item => item.str)
        .join(" ");

    console.log(text);

    parseMarkers(text);
}

// function parseMarkers(text) {

//     const patterns = {
//         IL6: /IL-?6\s+([0-9.]+)/i,
//         TNFA: /TNF[- ]?(?:α|a)\s+([0-9.]+)/i,
//         IL8: /IL[-\s]?8\s+([0-9.]+)/i,
//         IL1B: /IL-?1(?:β|B)\s+([0-9.]+)/i,
//         MCP1: /MCP.*?1\s+([0-9.]+)/i,
//         CRP: /CRP\s+([0-9.]+)/i,
//         IL10: /IL-?10\s+([0-9.]+)/i,
//         IFNG: /IFNG\s+([0-9.]+)/i,
//         IL17: /IL-?17\s+([0-9.]+)/i,
//         CD163: /CD163\s+([0-9.]+)/i,
//         NOS2: /NOS2\s+([0-9.]+)/i,
//         TGFB1: /TGFB1\s+([0-9.]+)/i,
//         COL1A1: /COL1A1\s+([0-9.]+)/i,
//         HMOX1: /HMOX1\s+([0-9.]+)/i,
//         COX2: /COX-?2\s+([0-9.]+)/i,
//         NLRP3: /NLRP3\s+([0-9.]+)/i,
//         CASP1: /CASP1\s+([0-9.]+)/i,
//         CYCS: /CYCS\s+([0-9.]+)/i,
//         LDHA: /LDH\s*A\s+([0-9.]+)/i,
//         LDHB: /LDH\s*B\s+([0-9.]+)/i
//     };

//     Object.entries(patterns).forEach(([marker, regex]) => {

//         const match = text.match(regex);

//         if (!match) return;

//         const input = document.querySelector(
//             `[data-marker="${marker}"]`
//         );

//         if (input) {
//             input.value = parseFloat(match[1]);
//         }
//     });
// }
function parseMarkers(text) {

    const patterns = {
        IL6: /IL\s*-\s*6\s+([0-9]+(?:\.[0-9]+)?)/i,
        TNFA: /TNF\s*-\s*(?:α|a)\s+([0-9]+(?:\.[0-9]+)?)/i,
        IL8: /IL\s*-\s*8\s+([0-9]+(?:\.[0-9]+)?)/i,
        IL1B: /IL\s*-\s*1(?:β|B)\s+([0-9]+(?:\.[0-9]+)?)/i,
        MCP1: /MCP\s*-\s*1\s+([0-9]+(?:\.[0-9]+)?)/i,
        CRP: /CRP\s+([0-9]+(?:\.[0-9]+)?)/i,
        IL10: /IL\s*-\s*10\s+([0-9]+(?:\.[0-9]+)?)/i,
        IFNG: /IFNG\s+([0-9]+(?:\.[0-9]+)?)/i,
        IL17: /IL\s*-\s*17\s+([0-9]+(?:\.[0-9]+)?)/i,
        CD163: /CD163\s+([0-9]+(?:\.[0-9]+)?)/i,
        NOS2: /NOS2\s+([0-9]+(?:\.[0-9]+)?)/i,
        TGFB1: /TGFB1\s+([0-9]+(?:\.[0-9]+)?)/i,
        COL1A1: /COL1A1\s+([0-9]+(?:\.[0-9]+)?)/i,
        HMOX1: /HMOX1\s+([0-9]+(?:\.[0-9]+)?)/i,
        COX2: /COX\s*-\s*2\s+([0-9]+(?:\.[0-9]+)?)/i,
        NLRP3: /NLRP3\s+([0-9]+(?:\.[0-9]+)?)/i,
        CASP1: /CASP1\s+([0-9]+(?:\.[0-9]+)?)/i,
        CYCS: /CYCS\s+([0-9]+(?:\.[0-9]+)?)/i,
        LDHA: /LDH\s*A\s+([0-9]+(?:\.[0-9]+)?)/i,
        LDHB: /LDH\s*B\s+([0-9]+(?:\.[0-9]+)?)/i
    };

    Object.entries(patterns).forEach(([marker, regex]) => {

        const match = text.match(regex);

        if (!match) {
            console.log("NOT FOUND:", marker);
            return;
        }

        const value = parseFloat(match[1]);

        populateMarker(marker, value);

        console.log(marker, value);
    });
}


function populateMarker(markerName, value) {

    const input = document.querySelector(
        `[data-marker="${markerName}"]`
    );

    if (!input) return;

    input.value = value;

    const row = input.closest("tr");
    const statusCell = row.querySelector(".status");

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
}