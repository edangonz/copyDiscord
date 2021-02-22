const getMessage = (code) => {
    switch (code) {
        case 100:
            break;
        case 101:
            break;
        case 102:
            break;
        case 103:
            break;
        case 104:
            break;
        case 105:
            break;
        case 106:
            break;
        case 107:
            break;
        case 108:
            break;
        case 109:
            break;
        case 401:
            return {color: 'var(--green)', message: `Se ha enviado su solicitud de amistad a ${this.state.contact_selected.username}.`};
        case 406:
            return {color: 'var(--green)', message: 'Ustedes ya son amigos.'};
        case 405:
            return {color: 'var(--green)', message: 'Existe una solicitud de amistada pendiente.'};
        case 408:
            return {color: 'var(--red)', message: 'Error interno intente mas tarde.'};
        default:
            return {color: 'var(--font-secondary)', message: 'Enviar solicitud de amistad entrante.'};
    }
}

export {
    getMessage
}