import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const EmojiInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        <input
            type="text"
            ref={ref}
            {...props}
        />
    ),
);
EmojiInput.displayName = "EmojiInput";

export { EmojiInput };
