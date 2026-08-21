// ===========================================
// Clinical Context
// frontend/js/context.js
// ===========================================
console.log("context.js loaded");
function getClinicalContext() {

    return {

        presentation:
            document.getElementById("presentation").value,

        traumaType:
            document.getElementById("traumaType").value,

        treatmentStatus:
            document.getElementById("treatmentStatus").value,

        therapy:
            document.getElementById("therapyModality").value,

        comorbidities:
            document.getElementById("comorbidities").value,

        medications:
            document.getElementById("medications").value

    };

}