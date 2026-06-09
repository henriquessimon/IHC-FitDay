export function AuthCard(mode = "login") {

    const isLogin = mode === "login";

    return `
        <section class="authCard">

            <div class="authHeader">
                <h2>
                    ${isLogin ? "Entrar" : "Criar Conta"}
                </h2>

                <p>
                    ${
                        isLogin
                        ? "Faça login para continuar"
                        : "Crie sua conta para começar"
                    }
                </p>
            </div>

            <form class="authForm">

                ${
                    !isLogin
                    ? `
                        <div class="inputBox">
                            <label>Nome</label>

                            <input
                                type="text"
                                class="userName"    
                                placeholder="Digite seu nome"
                            >

                            <span class="errorText"></span>
                        </div>
                    `
                    : ""
                }

                <div class="inputBox">
                    <label>E-mail</label>

                    <input
                        type="email"
                        class="userEmail"
                        placeholder="Digite seu e-mail"
                    >

                    <span class="errorText"></span>
                </div>

                <div class="inputBox">
                    <label>Senha</label>

                    <input
                        type="password"
                        class="userPassword"
                        placeholder="Digite sua senha"
                    >

                    <span class="errorText"></span>
                </div>

                ${
                    !isLogin
                    ? `
                        <div class="inputBox">
                            <label>Confirmar senha</label>

                            <input
                                type="password"
                                class="confirmPassword"
                                placeholder="Confirme sua senha"
                            >

                            <span class="errorText"></span>
                        </div>
                    `
                    : ""
                }

                <button 
                    type="submit"
                    class="authButton"
                >
                    ${
                        isLogin
                        ? "Entrar"
                        : "Criar Conta"
                    }
                </button>

            </form>

            <div class="switchMode">

                ${
                    isLogin
                    ? `
                        <p>
                            Não possui conta?
                            <span id="toggleAuth">
                                Criar conta
                            </span>
                        </p>
                    `
                    : `
                        <p>
                            Já possui conta?
                            <span id="toggleAuth">
                                Fazer login
                            </span>
                        </p>
                    `
                }

            </div>

        </section>
    `;
}