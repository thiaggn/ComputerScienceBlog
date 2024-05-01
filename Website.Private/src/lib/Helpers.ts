export function j(...args: (any)[]): string {
    return args.join(" ");
}

export function getDateFormatted(): string {
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const mesesDoAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const dataAtual = new Date();
    const diaDaSemana = diasDaSemana[dataAtual.getDay()];
    const diaDoMes = dataAtual.getDate();
    const mes = mesesDoAno[dataAtual.getMonth()];

    return `${diaDaSemana}, ${diaDoMes} de ${mes}`;
}

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