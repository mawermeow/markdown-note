import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const useKeyPress = (keys:string[], callback:any, node = null) => {
    // implement the callback ref pattern
    const callbackRef = useRef(callback);
    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    // handle what happens on key press
    const handleKeyPress = useCallback(
        (event:KeyboardEvent) => {
            // check if one of the key is part of the ones we want

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



        },
        [keys]
    );

    useEffect(() => {
        // target is either the provided node or the document
        const targetNode = node ?? document;
        // attach the event listener
        targetNode &&
        targetNode.addEventListener("keydown", handleKeyPress);

        // remove the event listener
        return () =>
            targetNode &&
            targetNode.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress, node]);
};

export default useKeyPress;