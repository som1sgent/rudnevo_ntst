function openModal() {
            const modal = document.getElementById('feedbackModal');
            modal.style.display = 'flex';
            document.getElementById('formContent').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            clearErrors();
        }

        function closeModal() {
            const modal = document.getElementById('feedbackModal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
            clearErrors();
        }

        function clearErrors() {
            document.getElementById('nameError').style.display = 'none';
            document.getElementById('emailError').style.display = 'none';
            document.getElementById('questionError').style.display = 'none';
        }

        function validateForm() {
            let isValid = true;
            clearErrors();

            // Валидация имени
            const name = document.getElementById('name').value.trim();
            const nameRegex = /^[a-zA-Zа-яА-Я\s]{2,}$/;
            if (!nameRegex.test(name)) {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }

            // Валидация email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }

            // Валидация вопроса
            const question = document.getElementById('question').value.trim();
            if (question.length < 10) {
                document.getElementById('questionError').style.display = 'block';
                isValid = false;
            }

            return isValid;
        }

        function submitForm() {
            if (validateForm()) {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const question = document.getElementById('question').value;
                document.getElementById('formContent').style.display = 'none';
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.classList.add('active');
                }, 10);
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('question').value = '';
            }
        }

        // Закрытие модального окна при клике вне формы
        window.onclick = function(event) {
            const modal = document.getElementById('feedbackModal');
            if (event.target === modal) {
                closeModal();
            }
        }