import { forwardRef } from "react";
const EmojiInput = forwardRef(({ className, ...props }, ref) => (<input type="text" ref={ref} {...props}/>));
EmojiInput.displayName = "EmojiInput";
export { EmojiInput };
