import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const EmojiInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {

        function handleKeyup(event: any) {
            if ((event.keyCode === 186) || (event.key === ":")) {
                console.log("show menu");
            }
        }

        return (<input
            type="text"
            ref={ref}
            {...props}
            onKeyUp={handleKeyup}
        />);
    }
);
EmojiInput.displayName = "EmojiInput";

export { EmojiInput };
