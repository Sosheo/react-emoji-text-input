import { forwardRef } from "react";
const EmojiInput = forwardRef(({ className, ...props }, ref) => {
    function handleKeyup(event) {
        if ((event.keyCode === 186) || (event.key === ":")) {
            console.log("show menu");
        }
    }
    return (<input type="text" ref={ref} {...props} onKeyUp={handleKeyup}/>);
});
EmojiInput.displayName = "EmojiInput";
export { EmojiInput };
