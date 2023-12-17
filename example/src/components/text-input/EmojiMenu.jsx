import { useRef, useEffect } from "react";
import emojis from "./emojis.json";
const EmojiButton = ({ emoji, addEmoji }) => {
    return (<button onClick={() => addEmoji(emoji.e)} className={'emoji-button'}>
            {emoji.e}
        </button>);
};
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
                {emojis.map((emoji, index) => (<EmojiButton key={index} emoji={emoji} addEmoji={addEmoji}/>))}
            </div>
        </>);
};
export { EmojiMenu };
