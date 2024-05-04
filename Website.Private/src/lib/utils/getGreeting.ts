export function getGreeting(): string {
    const horaAtual = new Date().getHours();

    if (horaAtual >= 6 && horaAtual < 12) {
        return "Bom dia";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        return "Boa tarde";
    } else {
        return "Boa noite";
    }
}