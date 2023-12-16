import { useRef, useEffect } from "react";
import emojis from "./emojis.json";

type EmojiMenuParams = { 
    closeMenu: () => void,
    addEmoji: (emoji: string) => void,
}

const EmojiMenu = ({ closeMenu, addEmoji }: EmojiMenuParams) => {
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
            `}</style>

            <div ref={ref} className={'emoji-menu'} style={menuStyle}>
                {emojis.map((emoji, index) => (
                    <button onClick={() => addEmoji(emoji.e)} key={index} style={{ flexBasis: "16.6%", backgroundColor: "transparent", border: "0px", margin: "0px", padding: "0px", fontSize: "1.8rem"  }}>
                        {emoji.e}
                    </button>
                ))}
            </div>
        </>
    );
}

export { EmojiMenu };