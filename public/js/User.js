import { AuthCard } from "../../components/createAndLoginUser.js";

const app = document.getElementById("app");

let currentMode = "login";

document.addEventListener("input", (e) => {

    if(e.target.classList.contains("userName")) {

        const input = e.target;

        if(!validateName(input.value)) {

            setError(
                input,
                "Nome deve ter pelo menos 3 caracteres"
            );

        } else {

            clearError(input);
        }
    }
});

document.addEventListener("input", (e) => {

    if(e.target.classList.contains("userEmail")) {

        const input = e.target;

        if(!validateEmail(input.value)) {

            setError(
                input,
                "E-mail inválido"
            );

        } else {

            clearError(input);
        }
    }
});

document.addEventListener("input", (e) => {

    if(e.target.classList.contains("userPassword")) {

        const input = e.target;

        if(!validatePassword(input.value)) {

            setError(
                input,
                "Senha deve ter no mínimo 6 caracteres"
            );

        } else {

            clearError(input);
        }
    }
});

document.addEventListener("input", (e) => {

    if(e.target.classList.contains("confirmPassword")) {

        const input = e.target;

        const password =
            document.querySelector(".userPassword");

        if(input.value !== password.value) {

            setError(
                input,
                "As senhas não coincidem"
            );

        } else {

            clearError(input);
        }
    }
});

document.addEventListener("click", (e) => {

    if(e.target.classList.contains("authButton")) {

        e.preventDefault();

        const form = e.target.closest(".authForm");

        const isLogin =
            e.target.textContent.trim() === "Entrar";

        const nameInput = form.querySelector(".userName");
        const emailInput = form.querySelector(".userEmail");
        const passwordInput = form.querySelector(".userPassword");
        const confirmPasswordInput =
            form.querySelector(".confirmPassword");

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const password = passwordInput?.value.trim();
        const confirmPassword =
            confirmPasswordInput?.value.trim();

        let isValid = true;

        // =========================
        // LOGIN
        // =========================

        if(isLogin) {

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            const foundUser = users.find(user =>
                user.email === email &&
                user.password === password
            );

            // NÃO ENCONTROU
            if(!foundUser) {

                setError(
                    emailInput,
                    "E-mail ou senha inválidos"
                );

                setError(
                    passwordInput,
                    "E-mail ou senha inválidos"
                );

                return;
            }

            // LIMPA ERROS
            clearError(emailInput);
            clearError(passwordInput);

            // LOGA USER
            foundUser.logado = true;

            localStorage.setItem(
                "currentUser",
                JSON.stringify(foundUser)
            );

            window.location.href =
                "../views/index.html";

            return;
        }

        // =========================
        // VALIDA NOME
        // =========================

        if(nameInput) {

            if(name.length < 3) {
                setError(nameInput, "Nome muito curto");
                isValid = false;
            } else {
                clearError(nameInput);
            }
        }

        // =========================
        // VALIDA EMAIL
        // =========================

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) {

            setError(emailInput, "E-mail inválido");
            isValid = false;

        } else {

            clearError(emailInput);
        }

        // =========================
        // VALIDA SENHA
        // =========================

        if(password.length < 6) {

            setError(
                passwordInput,
                "Senha precisa ter 6 caracteres"
            );

            isValid = false;

        } else {

            clearError(passwordInput);
        }

        // =========================
        // CONFIRMA SENHA
        // =========================

        if(confirmPasswordInput) {

            if(password !== confirmPassword) {

                setError(
                    confirmPasswordInput,
                    "As senhas não coincidem"
                );

                isValid = false;

            } else {

                clearError(confirmPasswordInput);
            }
        }

        // =========================
        // VERIFICA SE JÁ EXISTE
        // =========================

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const alreadyExists = users.find(
            user => user.email === email
        );

        if(alreadyExists) {

            setError(
                emailInput,
                "E-mail já cadastrado"
            );

            return;
        }

        // =========================
        // SE NÃO FOR VÁLIDO
        // =========================

        if(!isValid) return;

        // =========================
        // CRIA USER
        // =========================

        const newUser = {
            name,
            email,
            password,
            logado: true
        };

        // =========================
        // SALVA USERS
        // =========================

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        // =========================
        // SALVA SESSÃO
        // =========================

        localStorage.setItem(
            "currentUser",
            JSON.stringify(newUser)
        );

        alert("Conta criada com sucesso!");

        // REDIRECIONA
        window.location.href = "../views/index.html";
    }
});


render();

function render() {

    app.innerHTML = AuthCard(currentMode);

    document
        .getElementById("toggleAuth")
        .addEventListener("click", toggleMode);
}

function toggleMode() {

    currentMode =
        currentMode === "login"
        ? "register"
        : "login";

    render();
}

function validateEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

function validatePassword(password) {

    return password.length >= 6;
}

function validateName(name) {

    return name.trim().length >= 3;
}

function setError(input, message) {

    input.classList.add("error");

    let error =
        input.parentElement.querySelector(".error-message");

    if(!error) {

        error = document.createElement("span");

        error.classList.add("error-message");

        input.parentElement.appendChild(error);
    }

    error.textContent = message;
}

function clearError(input) {

    input.classList.remove("error");

    const error =
        input.parentElement.querySelector(".error-message");

    if(error) {
        error.remove();
    }
}