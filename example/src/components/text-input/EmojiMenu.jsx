import emojis from "./emojis.json";
const EmojiMenu = () => {
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
    };
    return (<>
            <div style={menuStyle}>
                {emojis.map((emoji, index) => (<span key={index} style={{ flexBasis: "16.6%" }}>
                        {emoji.e}
                    </span>))}


            </div>
        </>);
};
export { EmojiMenu };
