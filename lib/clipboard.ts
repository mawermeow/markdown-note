export const getPaste = async ()=>{
    const text =  await navigator.clipboard.readText();
    return text.toString();
};