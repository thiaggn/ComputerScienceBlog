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