// ===========================================
// patient-report.js
// ===========================================

function renderPatientReport(result) {

    document.getElementById("patientState").textContent =
        result.state || "--";

    document.getElementById("patientZone").textContent =
        result.zone || "--";

    document.getElementById("patientInterpretation").innerHTML = `
        <p>
            This section will contain a patient-friendly explanation
            of your TCPM results.
        </p>

        <p>
            For the current prototype, this is placeholder content.
        </p>
    `;
}


// ===========================================
// Placeholder Chat
// ===========================================

document
    .getElementById("sendPatientQuestion")
    .addEventListener("click", sendPatientQuestion);


function sendPatientQuestion() {

    const input = document.getElementById("patientQuestion");

    const question = input.value.trim();

    if (!question) return;

    const chat = document.getElementById("patientChat");

    chat.innerHTML += `

        <div class="chat-message user">

            <strong>You</strong>

            <p>${question}</p>

        </div>

        <div class="chat-message assistant">

            <strong>Assistant</strong>

            <p>
                Thank you for your question.

                This conversational feature is currently under
                development.

                Future versions will provide personalized explanations
                based on your report.
            </p>

        </div>

    `;

    input.value = "";

    chat.scrollTop = chat.scrollHeight;

}