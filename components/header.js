export function Header() {

    return `
        <nav>
            <ul>
                <li>
                    <button class="estatisticas buttonsNavigation">
                        Estatísticas
                    </button>
                </li>

                <li>
                    <button class="rotina buttonsNavigation">
                        Rotina
                    </button>
                </li>
            </ul>
        </nav>

        <div class="rightHeader">
            <!-- USER -->
            <div id="userWrapper" class="userWrapper">
                <button class="userIcon">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-label="Opções de usuário"
                    >
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M5 20v-2a7 7 0 0 1 14 0v2"/>
                    </svg>
                </button>

                <article class="userMenu">

                    <button class="logoutButton">
                        Sair da conta
                    </button>

                    <button class="deleteAccountButton">
                        Excluir conta
                    </button>

                </article>

            </div>

            <!-- CONFIG -->
            <div id="configWrapper">
                <button class="configButton">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        aria-label="Preferências de Usuário"
                    >
                        <path fill="white" d="
                            M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58
                            c.18-.14.23-.41.12-.61l-1.92-3.32c-.11-.2-.36-.28-.57-.22l-2.39.96
                            c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.488.488 0 0 0 14 2h-4
                            c-.24 0-.44.17-.48.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96
                            c-.21-.06-.46.02-.57.22L2.66 8.47c-.11.2-.06.47.12.61l2.03 1.58
                            c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58
                            c-.18.14-.23.41-.12.61l1.92 3.32c.11.2.36.28.57.22l2.39-.96
                            c.5.38 1.03.7 1.62.94l.36 2.54c.04.24.24.41.48.41h4
                            c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96
                            c.21.06.46-.02.57-.22l1.92-3.32c.11-.2.06-.47-.12-.61l-2.03-1.58z

                            M12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z
                        "/>
                    </svg>
                </button>

                <article class="configMenuBox">
                    <ul>
                        <li>
                            <label class="selectTemaLabel">

                                <span>Tema</span>

                                <select
                                    value="colorido"
                                    id="selectTema"
                                >
                                    <option value="colorido">
                                        Colorido
                                    </option>

                                    <option value="claro">
                                        Claro
                                    </option>

                                    <option value="escuro">
                                        Escuro
                                    </option>

                                </select>

                            </label>
                        </li>

                    </ul>
                </article>

            </div>

        </div>
    `;
}