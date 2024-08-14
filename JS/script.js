document.addEventListener('DOMContentLoaded', function() {
    const maleButton = document.getElementById('maleButton');
    const femaleButton = document.getElementById('femaleButton');
    const genderButtons = document.querySelectorAll('.gender-button');

    genderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            genderButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            this.classList.add('active');

            // Save the selected gender
            const selectedGender = this.id === 'maleButton' ? 'male' : 'female';
            this.dataset.selectedGender = selectedGender;
        });
    });

    document.getElementById('formBMI').addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedGender = document.querySelector('.gender-button.active');
        const height = parseFloat(document.getElementById('height').value) / 100;
        const weight = parseFloat(document.getElementById('weight').value);
        const age = parseInt(document.getElementById('age').value);

        const errorMessages = document.getElementById('errorMessages');
        errorMessages.textContent = '';

        if (!selectedGender || !height || height <= 0 || !weight || weight <= 0 || !age || age <= 0) {
            errorMessages.textContent = 'Please input all the form';
            return;
        }

        const bmi = (weight / (height * height)).toFixed(1);

        const resultSection = document.getElementById('bmi-result');
        const result = document.getElementById('result');
        result.textContent = `Your BMI is ${bmi}.`;

        const explanationSection = document.getElementById('bmi-explanation');
        const explanation = document.getElementById('explanation');
        let explanationText = '';

        if (bmi < 18.5) {
            explanationText = 'You are underweight. It might be beneficial to consult with a healthcare provider to ensure you’re getting the necessary nutrients.';
        } else if (bmi < 24.9) {
            explanationText = 'You have a normal weight. Maintaining a balanced diet and regular exercise can help keep your BMI in this range.';
        } else if (bmi < 29.9) {
            explanationText = 'You are overweight. Consider lifestyle changes such as increased physical activity and a healthier diet to lower your BMI.';
        } else {
            explanationText = 'You are obese. It’s important to seek advice from a healthcare professional to develop a plan for achieving a healthier weight.';
        }

        explanation.textContent = explanationText;

        [resultSection, explanationSection].forEach(section => {
            section.style.display = 'block';
            section.classList.remove('fade-in');
        });

        void resultSection.offsetWidth;

        [resultSection, explanationSection].forEach(section => {
            section.classList.add('fade-in');
        });
    });
});
