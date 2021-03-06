//listen for submit

document.getElementById('loan-form').addEventListener('submit', function(e) {
    //hide results
    document.querySelector('#results').style.display = 'none';
    //show loader
    document.querySelector('#loading').style.display = 'block';
    
    setTimeout(calculateResults, 1500);
    e.preventDefault();
});

function calculateResults() {
    console.log('calc')
    //ui vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.querySelector('#results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';

    } else {
        showError('Please check your numbers');
    }
}

function showError(error) {
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';
    //create div
    const errorDiv = document.createElement('div');
    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //class
    errorDiv.className = 'alert alert-danger';
    //create textnode and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    card.insertBefore(errorDiv, heading);
    //clear error after 3seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}