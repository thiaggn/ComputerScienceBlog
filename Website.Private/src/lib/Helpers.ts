export function j(...args: (any)[]): string {
    return args.join(" ");
}

export function getFormattedDate(): string {
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

export function getFormattedElapsedTime(dataISO: string): string {
    const dataAtual = new Date();
    const dataPassada = new Date(dataISO);
    const diferencaEmSegundos = Math.floor((dataAtual.getTime() - dataPassada.getTime()) / 1000);

    // Calcula o tempo passado em segundos, minutos, horas e dias
    const segundos = diferencaEmSegundos % 60;
    const minutos = Math.floor(diferencaEmSegundos / 60) % 60;
    const horas = Math.floor(diferencaEmSegundos / (60 * 60)) % 24;
    const dias = Math.floor(diferencaEmSegundos / (60 * 60 * 24));

    // Se foi há menos de 60 segundos
    if (diferencaEmSegundos < 60) {
        return `há ${diferencaEmSegundos} segundos`;
    }
    // Se foi há mais de 60 segundos e menos de 60 minutos
    else if (diferencaEmSegundos < 60 * 60) {
        return `há ${minutos} minutos`;
    }
    // Se foi há mais de 60 minutos e menos de 24 horas
    else if (diferencaEmSegundos < 60 * 60 * 24) {
        return `há ${horas} horas`;
    }
    // Se foi há mais de 24 horas e menos de 48 horas
    else if (dias === 1) {
        const hora = dataPassada.getHours();
        let periodo = '';
        if (hora < 12) {
            periodo = 'de manhã';
        } else if (hora < 18) {
            periodo = 'à tarde';
        } else {
            periodo = 'à noite';
        }
        return `ontem ${periodo}`;
    }
    // Caso contrário, retorna a data em dd/mm/aaaa
    else {
        const dia = String(dataPassada.getDate()).padStart(2, '0');
        const mes = String(dataPassada.getMonth() + 1).padStart(2, '0');
        const ano = dataPassada.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
}