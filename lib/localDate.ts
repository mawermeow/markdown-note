export const getLocalDate = ():string => {
    const d = new Date();
    return d.getFullYear() + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getDate().toString().padStart(2, '0');
};

export const getTimestamp=()=>{
    return new Date().getTime();
};