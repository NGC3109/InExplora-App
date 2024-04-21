export const passwordCriteria = {
    length: { regex: /.{8,}/, message: 'Al menos 8 caracteres.' },
    number: { regex: /\d/, message: 'Al menos un número.' },
    uppercase: { regex: /[A-Z]/, message: 'Al menos una letra mayúscula.' },
    symbol: { regex: /[^A-Za-z0-9]/, message: 'Al menos un símbolo.' }
};