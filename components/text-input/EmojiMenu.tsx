import { useRef, useEffect } from "react";
import emojis from "./emojis.json";

type Emoji = {
    u: string;
    e: string;
    n: string;
}

type EmojiMenuParams = { 
    closeMenu: () => void,
    addEmoji: (emoji: string) => void,
    filter: string,
}

type EmojiButtonParams = {
    emoji: Emoji,
    addEmoji: (emoji: string) => void,
}

const EmojiButton = ({ emoji, addEmoji }: EmojiButtonParams) => {
    return (
        <button
            onClick={() => addEmoji(emoji.e)}
            className={'emoji-button'}
        >
            {emoji.e}
        </button>
    );
}

const EmojiMenu = ({ closeMenu, addEmoji, filter }: EmojiMenuParams) => {
    const ref = useRef<any>(null);
    
    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (ref.current && !ref.current.contains(event.target)) {
                closeMenu();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, closeMenu]);

    const menuStyle = {
        position: "absolute" as "absolute",
        padding: "10px",
        border: "1px solid white",
        backgroundColor: "gray",
        display: "flex",
        width: "280px",
        flexWrap: "wrap" as "wrap",
        height: "280px",
        overflowX: "hidden" as "hidden",
        overflowY: "scroll" as "scroll",
        scrollbarWidth: "thin" as "thin",
    }

    return (
        <>
            { /* @ts-ignore */ }
            <style>{`
                .emoji-menu {
                    scrollbar-width: thin;
                    scrollbar-color: blue orange;
                }

                .emoji-menu::-webkit-scrollbar {
                    width: 10px;
                }
                
                .emoji-menu::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .emoji-menu::-webkit-scrollbar-thumb {
                    background-color: black;
                    border-radius: 20px;
                    border: 3px solid grey;
                }

                .emoji-menu .emoji-button {
                    flex-basis: 16.6%;
                    background-color: transparent;
                    border: 0px;
                    margin: 0px;
                    padding: 0px;
                    font-size: 1.8rem;
                    cursor: pointer;
                }
            `}</style>

            <div ref={ref} className={'emoji-menu'} style={menuStyle}>
                {emojis.map((emoji, index) => (
                    <EmojiButton key={index} emoji={emoji} addEmoji={addEmoji} />
                ))}
            </div>
        </>
    );
}

export { EmojiMenu };