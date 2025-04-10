// Function to open the login modal
        function openLoginModal() {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.style.display = 'flex';
            }
        }

        // Function to close the login modal
        function closeLoginModal() {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.style.display = 'none';
            }
        }

        // Function to open the register modal
        function openRegisterModal() {
            const registerModal = document.getElementById('registerModal');
            if (registerModal) {
                registerModal.style.display = 'flex';
            }
        }

        // Function to close the register modal
        function closeRegisterModal() {
            const registerModal = document.getElementById('registerModal'); // Fixed typo
            if (registerModal) {
                registerModal.style.display = 'none';
            }
        }

        // Function to open the reset modal
        function openResetModal() {
            const resetModal = document.getElementById('resetModal');
            if (resetModal) {
                resetModal.style.display = 'flex';
            }
        }

        // Hide all modals by default
        document.addEventListener('DOMContentLoaded', () => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });

        // Event listeners for buttons
        document.getElementById('loginBtn').addEventListener('click', openOtpPopup);
        document.getElementById('signupBtn').addEventListener('click', openRegisterModal);
        // Function to open the OTP popup
        function openOtpPopup() {
            hideAllModals();
            const otpPopup = document.getElementById('otpPopup');
            if (otpPopup) {
            otpPopup.style.display = 'flex';
            }
        }

        // Function to hide all modals
        function hideAllModals() {
            const modals = document.querySelectorAll('.v-dialog__content');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }

        // Modify modal open functions to hide all modals first
        function openLoginModal() {
            hideAllModals();
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.style.display = 'flex';
            }
        }

        function openRegisterModal() {
            hideAllModals();
            const registerModal = document.getElementById('registerModal');
            if (registerModal) {
                registerModal.style.display = 'flex';
            }
        }

        function openResetModal() {
            hideAllModals();
            const resetModal = document.getElementById('resetModal');
            if (resetModal) {
                resetModal.style.display = 'flex';
            }
        }
        // Function to close the reset modal
        function closeResetModal() {
            const resetModal = document.getElementById('resetModal');
            if (resetModal) {
                resetModal.style.display = 'none';
            }
        }
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
