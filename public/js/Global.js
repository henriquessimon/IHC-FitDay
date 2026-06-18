//ATIVA E DESATIVA CAIXA DE CONFIGURAÇÕES
const configWrapper = document.getElementById('configWrapper')
const configMenuBox = document.querySelector('.configMenuBox');

//MOSTRA A CAIXA DE CONFIGS
configWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.classList.remove("active");
    configMenuBox.classList.toggle('active')
})

//IMPEDE DE FECHAR AO CLICAR NELA MESMA OU ELEMENTO DENTRO DELA
configMenuBox.addEventListener("click", (e) => {
    e.stopPropagation();
})

//ESCONDE A CAIXA DE CONFIGS
document.addEventListener("click", () => {
    configMenuBox.classList.remove('active')
})

const userWrapper =
document.getElementById("userWrapper");

const userMenu =
    document.querySelector(".userMenu");

// ABRE MENU
userWrapper.addEventListener("click", (e) => {

    e.stopPropagation();
    configMenuBox.classList.remove("active");
    userMenu.classList.toggle("active");
});

// NÃO FECHA AO CLICAR DENTRO
userMenu.addEventListener("click", (e) => {

    e.stopPropagation();
});

// FECHA AO CLICAR FORA
document.addEventListener("click", () => {

    userMenu.classList.remove("active");
});

userMenu.addEventListener("click", (e) => {

    // SAIR
    if(e.target.classList.contains("logoutButton")) {

        localStorage.removeItem("currentUser");

        window.location.href =
            "../views/logAndCreateUser.html";
    }

    // EXCLUIR CONTA
    if(e.target.classList.contains("deleteAccountButton")) {

        deleteAccountModal.classList.add("active");

        document
        .getElementById("confirmPassword")
        .focus();
        
        // fecha modal  
        deleteAccountModal.addEventListener("click", (e) => {
            if (
                e.target.id === "closeDeleteModal" ||
                e.target.id === "cancelDeleteAccount"
            ) {
                deleteAccountModal.classList.remove("active");
            }
            // confirma exclusão
            if (
                e.target.id === "confirmDeleteAccount"
            ) {
                console.log("crico")
                const currentUser =
                    JSON.parse(
                        localStorage.getItem("currentUser")
                    );

                if (!currentUser) return;

                const passwordInput =
                    document.getElementById(
                        "confirmPassword"
                    );

                const typedPassword =
                    passwordInput.value.trim();

                if (
                    typedPassword !== currentUser.password
                ) {
                    alert("Senha incorreta.");
                    return;
                }

                const users =
                    JSON.parse(
                        localStorage.getItem("users")
                    ) || [];

                const filteredUsers =
                    users.filter(user =>
                        user.email !== currentUser.email
                    );

                localStorage.setItem(
                    "users",
                    JSON.stringify(filteredUsers)
                );

                localStorage.removeItem(
                    "currentUser"
                );

                alert("Conta excluída com sucesso.");

                window.location.href =
                    "../views/logAndCreateUser.html";
            }
        })
    }
});

function changeTema() {

    const selectTema = document.getElementById("selectTema");

    // Carrega o tema salvo
    const tema = loadTema();

    selectTema.value = tema;

    document.body.classList.remove(
        "escuro",
        "claro",
        "colorido"
    );

    document.body.classList.add(tema);

    selectTema.addEventListener("change", () => {

        const tema = selectTema.value;

        document.body.classList.remove(
            "escuro",
            "claro",
            "colorido"
        );

        document.body.classList.add(tema);

        saveTema(tema);
    });
}

//MUDA O TEMA
changeTema();

const deleteAccountButton = document.querySelector(".deleteAccountButton");

const deleteAccountModal =
    document.getElementById("deleteAccountModal");

const closeDeleteModal =
    document.getElementById("closeDeleteModal");

const cancelDeleteAccount =
    document.getElementById("cancelDeleteAccount");

function openDeleteModal() {
    deleteAccountModal.classList.remove("hidden");
}

function closeDeleteModalFn() {
    deleteAccountModal.classList.add("hidden");
}

deleteAccountButton.addEventListener(
    "click",
    openDeleteModal
);

closeDeleteModal.addEventListener(
    "click",
    closeDeleteModalFn
);

cancelDeleteAccount.addEventListener(
    "click",
    closeDeleteModalFn
);

document.addEventListener("focusin", (e) => {

    if (
        deleteAccountModal.classList.contains("active") &&
        !deleteAccountModal.contains(e.target)
    ) {
        deleteAccountModal.classList.remove("active");
    }
});

export function loadTema() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    return currentUser?.tema || "escuro"; // tema padrão
}

export function saveTema(tema) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    currentUser.tema = tema;

    const updatedUsers = users.map(user => {

        if (user.id === currentUser.id) {
            return currentUser;
        }

        return user;
    });

    localStorage.setItem(
        "users",
        JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );
}