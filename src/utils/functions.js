export const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) => arr.slice(index * size, index * size + size));
};
export const isEmailValid = (email) => {
    const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
};

export const formatToThousands = (numero) => {
    if(numero){
        return numero.toLocaleString('de-DE', { maximumFractionDigits: 0 });
    }else{
        return numero
    }
};