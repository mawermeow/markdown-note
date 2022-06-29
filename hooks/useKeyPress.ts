import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const useKeyPress = (keys:string[], callback:any, node = null) => {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    const handleKeyPress = useCallback(
        (event:KeyboardEvent) => {

            // if (keys.some((key) => event.key === key)){
            //     console.log(event.code);
            // }

            const mainKeys =(key:string)=> {
                switch (key) {
                    case 'Control': return event.ctrlKey;
                    case 'Meta': return event.metaKey;
                    case 'Alt': return event.altKey;
                    case 'Shift': return event.shiftKey;
                }
            }

            if(keys.length===2){
                if(mainKeys(keys[0]) && event.key === keys[1]){
                    callbackRef.current(event);
                }
            }

            if(keys.length===3){
                if(mainKeys(keys[0]) && mainKeys(keys[1]) && event.key === keys[2]){
                    callbackRef.current(event);
                }
            }

        },
        [keys]
    );

    useEffect(() => {
        const targetNode = node ?? document;
        targetNode &&
        targetNode.addEventListener("keydown", handleKeyPress);

        return () =>
            targetNode &&
            targetNode.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress, node]);
};

export default useKeyPress;