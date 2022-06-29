export const getCopyText = async ()=>{
    return await navigator.clipboard.readText();
};