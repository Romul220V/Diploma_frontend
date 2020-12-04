export default class FormValidator {
    constructor(formContainer) {
        this.formContainer = formContainer;
        this.submitButton = formContainer.querySelector('.popup__button');
        this.submitButton.classList.add('popup__button_on');
        this.inputMail = formContainer.querySelectorAll('input')[0];
        this.inputPassword = formContainer.querySelectorAll('input')[1];
        this.inputName = formContainer.querySelectorAll('input')[2];
        this.errorMail = formContainer.querySelectorAll('span')[0];
        this.errorPassword = formContainer.querySelectorAll('span')[1];
        this.errorName = formContainer.querySelectorAll('span')[2];
    };

    setDefaultValue() {
        this.inputMail.value = "";
        this.inputPassword.value = "";
        this.inputName.value = "";
        this.errorMail.style.display = "none";
        this.errorPassword.style.display = "none";
        this.errorName.style.display = "none";
    }

    validateInputLength(inputValue) {
        if (inputValue.length > 1 && inputValue.length < 29) {
            return true;
        }
        return false;
    }

    showError(input, errorElement) {
        const inputValue = input.value;
        if (inputValue.length === 0) {
            errorElement.style.display = "inline";
            errorElement.textContent = "Это обязательное поле";
        }
        if (this.validateInputLength(inputValue)) {
            errorElement.style.display = "none";
        }
    };

    validateEmail(value) {
        return /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test(value);
    };

    showEmailError(input, errorElement) {
        const mail = input.value;
        if (this.validateEmail(mail)) {
            errorElement.style.display = "none";
        }
        else {
            errorElement.style.display = "inline";
            errorElement.textContent = "Здесь должен быть почтовый ящик";
        };

    };

    setSubmitButtonState() {
        const lenghtValid = this.validateInputLength(this.inputMail.value)
            && this.validateInputLength(this.inputPassword.value)
            && this.validateInputLength(this.inputName.value);
        const emailValid = this.validateEmail(this.inputMail.value)

        if (lenghtValid && emailValid) {
            this.submitButton.disabled = false;
            this.submitButton.classList.add('popup__button_on')
        }
        else {
            this.submitButton.disabled = true;
            this.submitButton.classList.remove('popup__button_on')
        };
    };

    checkInputValidity() {
        this.showError(this.inputPassword, this.errorPassword);
        this.showError(this.inputName, this.errorName);
        this.showEmailError(this.inputMail, this.errorMail);
    };

    setEventListeners() {
        this.inputPassword.oninput = () => this.showError(this.inputPassword, this.errorPassword);
        this.inputName.oninput = () => this.showError(this.inputName, this.errorName);
        this.inputMail.oninput = () => this.showEmailError(this.inputMail, this.errorMail);
        this.formContainer.oninput = () => this.setSubmitButtonState();
    };

}
