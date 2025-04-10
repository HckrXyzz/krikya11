const baseUrl = 'https://feapi.sharky777.xyz';
async function loginUser(event) {
    event.preventDefault();
    const membercode = 'demokk';
    const password = '840600';
    const domain = "https://www.krikya11.com ";
    const option = "2";
    const platform = "mobile";
    const response = await fetch(`${baseUrl}/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ membercode, password, domain, option, platform }),
    });

    if (response.ok) {
        const { access_token } = await response.json();
        localStorage.setItem('authToken', access_token);
        localStorage.setItem('membercode', membercode);
        fetchMobileDetails();
        alert('Requesting OTP...');
        await requestOtp();
    } else {
        alert('Login failed');
    }
}

async function requestOtp() {
    const mobile = localStorage.getItem('contact');
    const prefix = '+880';
    const currency = "BDT";
    const language = "bd";
    const request_otp = true;
    const captcha_id = "123456789";
    const captcha_code = "1234";
    const otpResponse = await fetch(`${baseUrl}/api/mobile/request`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ mobile, prefix, currency, language, request_otp, captcha_id, captcha_code }),
    });

    if (otpResponse.ok) {
        alert('OTP has been requested. Please answer the call.');
        document.getElementById('otpPopup').style.display = 'flex';
    } else {
        alert('Failed to request OTP. Please try again.');
    }
}

async function verifyOtp() {
    const mobile = localStorage.getItem('contact');
    const verification_code = document.getElementById('otpCode').value;
    const captcha_id = "123456789";
    const captcha_code = "1234";
    const verifyResponse = await fetch(`${baseUrl}/api/mobile/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({ verification_code, mobile, captcha_id, captcha_code }),
    });

    if (verifyResponse.ok) {
        await mobileAdd();
    } else {
        alert('OTP verification failed. Please try again.');
    }
}

async function mobileAdd() {
    const addResponse = await fetch(`${baseUrl}/api/mobile/contact/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('authToken')
        },
        body: JSON.stringify({
            "verification_code": "",
            "mobile": "1611600400",
            "required_only_primary_verified": true
        }),
    });

    if (addResponse.ok) {
        const homeData = await addResponse.json();
        console.log('Home Data: ', homeData);
    } else {
        alert('Failed to fetch home data.');
    }
}

async function fetchMobileDetails() {
    const response = await fetch(`${baseUrl}/api/member/details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
    });

    if (response.ok) {
        const data = await response.json();
        const primaryMobile = data.data.contacts.find(contact => contact.contact_type === 'Mobile' && contact.is_primary === 1);
        if (primaryMobile) {
            localStorage.setItem('contact', primaryMobile.value);
        } else {
            alert('Primary mobile contact not found.');
        }
    } else {
        alert('Failed to fetch mobile details.');
    }
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
            setTimeout(() => refreshCaptcha(captchaId, captchaCode), 60000);
        })
        .catch(error => {
            console.error("Error refreshing captcha:", error);
            setTimeout(() => refreshCaptcha(captchaId, captchaCode), 60000);
        });
}

window.onload = function () {
    const captchaId = "123456789";
    const captchaCode = "1234";
    refreshCaptcha(captchaId, captchaCode);
};
