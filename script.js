function getAPIKey() {
    const captchaResponse = grecaptcha.getResponse();

    if (captchaResponse.length === 0) {
        alert("Please complete the CAPTCHA.");
        return;
    }

    fetch('/api/generate_key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captcha: captchaResponse })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const key = generateRandomKey();
            document.getElementById('result').innerHTML = `Your API Key: <a href="${data.link}" target="_blank">${key}</a>`;
        } else {
            alert('Captcha verification failed.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
