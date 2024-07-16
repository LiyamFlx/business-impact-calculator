let currentStep = 0;
const formSteps = document.querySelectorAll('.form-step');
const formData = {};

function nextStep() {
    if (currentStep < formSteps.length - 1) {
        formSteps[currentStep].classList.remove('active');
        currentStep++;
        formSteps[currentStep].classList.add('active');
    } else {
        showSummary();
    }
}

function prevStep() {
    if (currentStep > 0) {
        formSteps[currentStep].classList.remove('active');
        currentStep--;
        formSteps[currentStep].classList.add('active');
    }
}

function selectOption(field, value) {
    formData[field] = value;
    nextStep();
}

function showSummary() {
    const summary = document.getElementById('summary');
    summary.innerHTML = `
        <p>Market Size: ${formData.marketSize}</p>
        <p>Growth Potential: ${formData.growthPotential}</p>
        <p>Market Cap: ${formData.marketCap}</p>
        <p>Importance of Opportunity: ${formData.importanceOpportunity}</p>
    `;
}

function submitForm() {
    const results = document.getElementById('results');
    const impactScore = calculateImpact();
    results.innerHTML = `
        <h3>Your Impact Score: ${impactScore.toFixed(2)}%</h3>
    `;
    nextStep();
}

function calculateImpact() {
    const S = parseFloat(formData.marketSize);
    const P = parseFloat(formData.growthPotential);
    const D = parseFloat(formData.importanceOpportunity); // Simplified for this example

    const rawImpact = (S + P - D); // Simplified calculation

    const minScore = -3;
    const maxScore = 5;

    const normalizedImpact = ((rawImpact - minScore) / (maxScore - minScore)) * 100;
    
    return normalizedImpact;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        nextStep();
    }
});
