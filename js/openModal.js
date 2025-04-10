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
