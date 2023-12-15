import { forwardRef, useState, createRef, useRef } from "react";
import { EmojiMenu } from "./EmojiMenu";
const EmojiInput = forwardRef(({ className, ...props }, ref) => {
    const [showMenu, setShowMenu] = useState(false);
    const ref2 = useRef(null);

    function handleKeyup(event) {
        if ((event.keyCode === 186) || (event.key === ":")) {
            setShowMenu(true);
                    
            const node = ref2.current;
            const size = {
                width: node.offsetWidth,
                height: node.offsetHeight
            };
            const position = {
                x: node.offsetLeft,
                y: node.offsetTop
            };
            console.log(size, position);
        }
        if ((event.keyCode === 27) || event.key === "escape") {
            setShowMenu(false);
        }
    }
    return (
        <div ref={ref}>
            <input type="text" ref={ref2} {...props} onKeyUp={handleKeyup}/>
            {showMenu && <EmojiMenu />}
        </div>
    );
});
EmojiInput.displayName = "EmojiInput";
export { EmojiInput };
