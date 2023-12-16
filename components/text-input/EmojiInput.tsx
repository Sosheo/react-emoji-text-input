import { forwardRef, useState } from "react";
import { EmojiMenu } from "./EmojiMenu";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const EmojiInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
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

        return (
            <div>
                <input
                    type="text"
                    ref={ref}
                    {...props}
                    onKeyUp={handleKeyup}
                />
                {showMenu && <EmojiMenu closeMenu={closeMenu} />  }
            </div>
        );
    }
);
EmojiInput.displayName = "EmojiInput";

export { EmojiInput };
