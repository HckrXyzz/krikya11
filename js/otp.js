const domain = "https://www.krikya11.com".trim();

async function loginUser(event) {
    event.preventDefault();
    try {
        const membercode = document.getElementById('input-1136').value;
        const password = '840600';
        const domain = "https://www.krikya11.com".trim();
        const option = "2";
        const platform = "mobile";

        const response = await fetch(`${baseUrl}/api/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ membercode, password, domain, option, platform }),
        });

        if (!response.ok) {
            throw new Error(`Login failed with status: ${response.status}`);
        }

        const { access_token } = await response.json();
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('membercode', membercode);

        fetchMobileDetails();
        alert('Requesting OTP...');
        await requestOtp();
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please try again.');
    }
}

const membercodeInput = document.getElementById('input-1136');
if (!membercodeInput) {
    console.error('Input element with ID "input-1136" not found.');
    return;
}

function refreshCaptcha(captchaId, captchaCode) {
    const url = `https://feapi.sharky777.xyz/api/member/requestCaptchaCode?captcha_id=${captchaId}&captcha_code=${captchaCode}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Captcha refreshed:", data);
        })
        .catch(error => {
            console.error("Error refreshing captcha:", error);
        })
        .finally(() => {
            setTimeout(() => refreshCaptcha(captchaId, captchaCode), 60000);
        });
}
