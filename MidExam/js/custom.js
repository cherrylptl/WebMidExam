function formSubmit() {

    var jacketPrice = 4.50;
    var scissorPrice = 54.50;
    var jarPrice = 23.99;

    const email = document.getElementById('email').value.trim();
    const clientID = document.getElementById('clientID').value.trim();
    const jacketQty = document.getElementById('jacketQty').value.trim();
    const scissorQty = document.getElementById('scissorQty').value.trim();
    const jarQty = document.getElementById('jarQty').value.trim();


    document.getElementById('error-message').innerHTML = '';

    // Check for empty 
    if (email === '' || clientID === '') {
        displayErrorMessage('Email and Client ID are required fields.');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayErrorMessage('Email is not valid.');
        return false;
    }


    // Client ID 
    const clientIDRegex = /^\d{6}$/;
    if (!clientIDRegex.test(clientID)) {
        displayErrorMessage('Client ID must contain 6 numeric digits.');
        return false;
    }

    if (!isValidQuantity(jacketQty)) {
        displayErrorMessage('jacketQty positive integer.');
    }

    if (!isValidQuantity(scissorQty)) {
        displayErrorMessage('scissorQty positive integer.');
    }

    if (!isValidQuantity(jarQty)) {
        displayErrorMessage('jarQty positive integer.');
    }


    if (jarQty + scissorQty + jacketQty < 1) {
        displayErrorMessage('Purchase at least one');
    }


    // Check if at least one item is added or if quantities are not valid
    if ((!isValidQuantity(jacketQty) || !isValidQuantity(scissorQty) || !isValidQuantity(jarQty)) ||
        (parseInt(jacketQty) === 0 && parseInt(scissorQty) === 0 && parseInt(jarQty) === 0)) {
        if (parseInt(jacketQty) === 0 && parseInt(scissorQty) === 0 && parseInt(jarQty) === 0) {
            displayErrorMessage('Add at least one item.');
        } else {
            displayErrorMessage('At least one quantity must be a positive integer.');
        }
        return false;
    }



    var numJacketQty = jacketQty.trim() === '' ? 0 : parseInt(jacketQty);
    var numScissorQty = scissorQty.trim() === '' ? 0 : parseInt(scissorQty);
    var numJarQty = jarQty.trim() === '' ? 0 : parseInt(jarQty);


    const totalJacketCost = numJacketQty * jacketPrice;
    const totalScissorCost = numScissorQty * scissorPrice;
    const totalJarCost = numJarQty * jarPrice;
    const totalCost = totalJacketCost + totalScissorCost + totalJarCost;
    const tax = totalCost * 0.13;
    const totalAmmoun = totalCost + tax;


    const receiptHTML = `
        <p>Email: ${email}</p>
        <p>Client ID: ${clientID}</p>
        <h3>Product List :</h3>
        ${numJacketQty > 0 ? `<p>Jacket <br> Quantity: ${numJacketQty}, Price per unit: $${jacketPrice.toFixed(2)}, Total Cost: $${totalJacketCost.toFixed(2)}</p>` : ''}
        ${numScissorQty > 0 ? `<p>Scissor <br> Quantity: ${numScissorQty}, Price per unit: $${scissorPrice.toFixed(2)}, Total Cost: $${totalScissorCost.toFixed(2)}</p>` : ''}
        ${numJarQty > 0 ? `<p>Jar Quantity: ${numJarQty}, Price per unit: $${jarPrice.toFixed(2)}, Total Cost: $${totalJarCost.toFixed(2)}</p>` : ''}
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
        <p>Total Amount (Tax 13%): $${(totalAmmoun).toFixed(2)}</p>
    `;


    const receiptDetails = document.getElementById('receipt-details');
    receiptDetails.innerHTML = receiptHTML;


    document.getElementById('receipt').style.display = 'block';

    return false;
}

function isValidQuantity(quantity) {

    if (quantity.trim() === '') {
        return true;
    }
    const quantityRegex = /^\d+$/;
    return quantityRegex.test(quantity);

}

function displayErrorMessage(message) {
    const errorMessageElement = document.createElement('p');
    errorMessageElement.textContent = message;
    errorMessageElement.style.color = 'red';
    document.getElementById('error-message').appendChild(errorMessageElement);
}
