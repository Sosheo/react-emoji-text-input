import { useRef, useState } from "react";
import { EmojiMenu } from "./EmojiMenu";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

type EmojiInputParams = {
    className?: string;
    type?: string;
}

const EmojiInput = ({ className, type = "textinput", ...props }: EmojiInputParams) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    function handleKeyup(event: any) {
        if ((event.keyCode === 186) || (event.key === ":")) {
            return setShowMenu(true);
        }

        if ((event.keyCode === 27) || event.key === "escape") {
            return setShowMenu(false);
        }

        const textBeforeCursor = event.target.value.substring(0, event.target.selectionStart);
        const lastColonIndex = textBeforeCursor.lastIndexOf(':');

        if (lastColonIndex !== -1) {
            const textBetweenColonAndCursor = textBeforeCursor.substring(lastColonIndex + 1);
            setFilter(textBetweenColonAndCursor);
        }
    }

    function closeMenu() {
        setShowMenu(false);
    }

    function addEmoji(emoji: string) {
        const input = inputRef.current ?? textAreaRef.current;
        if (input) {
            const { selectionStart, selectionEnd } = input;

            if (selectionStart && selectionEnd) {
                const newValue = `${input.value.substring(0, selectionStart)}${emoji}${input.value.substring(selectionEnd)}`;
                input.value = newValue;
                input.focus();
                input.selectionStart = selectionStart + emoji.length;
                input.selectionEnd = selectionStart + emoji.length;
            }
        }
    }

    return (
        <div>
        {(type === "textinput") && (
            <input
                type="text"
                ref={inputRef}
                {...props}
                onKeyUp={handleKeyup}
            />
        )}
        {(type === "textarea") && (
            <textarea
                ref={textAreaRef}
                {...props}
                onKeyUp={handleKeyup}
            />
        )}
            {showMenu && <EmojiMenu addEmoji={addEmoji} closeMenu={closeMenu} />}
        </div>
    );
}

EmojiInput.displayName = "EmojiInput";

export { EmojiInput };
