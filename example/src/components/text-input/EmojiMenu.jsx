import { useRef, useEffect } from "react";
import emojis from "./emojis.json";
const EmojiMenu = ({ closeMenu, addEmoji }) => {
    const ref = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
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
        position: "absolute",
        padding: "10px",
        border: "1px solid white",
        backgroundColor: "gray",
        display: "flex",
        width: "280px",
        flexWrap: "wrap",
        height: "280px",
        overflowX: "hidden",
        overflowY: "scroll",
        scrollbarWidth: "thin",
    };
    return (<>
            {/* @ts-ignore */}
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
                {emojis.map((emoji, index) => (<button onClick={() => addEmoji(emoji.e)} key={index} style={{ flexBasis: "16.6%", backgroundColor: "transparent", border: "0px", margin: "0px", padding: "0px", fontSize: "1.8rem" }}>
                        {emoji.e}
                    </button>))}
            </div>
        </>);
};
export { EmojiMenu };
