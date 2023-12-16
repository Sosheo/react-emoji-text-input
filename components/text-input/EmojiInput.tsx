import { useRef, useState } from "react";
import { EmojiMenu } from "./EmojiMenu";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

type EmojiInputParams = InputProps & {
    className?: string;
}


const EmojiInput = ({ className, ...props }: EmojiInputParams) => {
    const ref = useRef<HTMLInputElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    function handleKeyup(event: any) {
        if ((event.keyCode === 186) || (event.key === ":")) {
            setShowMenu(true);
        }

        if ((event.keyCode === 27) || event.key === "escape") {
            setShowMenu(false);
        }
    }

    function closeMenu() {
        setShowMenu(false);
    }

    function addEmoji(emoji: string) {
            const input = ref.current;
            if (input) {
                const { selectionStart, selectionEnd } = input;

                if (selectionStart && selectionEnd) {
                    const newValue = input.value.substring(0, selectionStart) + emoji + input.value.substring(selectionEnd);
                    input.value = newValue;
                    input.focus();
                    input.selectionStart = selectionStart + emoji.length;
                    input.selectionEnd = selectionStart + emoji.length;
                }
            }
        }

    return (
        <div>
            <input
                type="text"
                ref={ref}
                {...props}
                onKeyUp={handleKeyup}
            />
            {showMenu && <EmojiMenu addEmoji={addEmoji} closeMenu={closeMenu} />  }
        </div>
    );
}

EmojiInput.displayName = "EmojiInput";

export { EmojiInput };
