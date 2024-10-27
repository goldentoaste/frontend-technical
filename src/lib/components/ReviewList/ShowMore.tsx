import { Button } from "../Button/Button";



export function ShowMoreButton({ onclick }: { onclick: () => void }) {

    // container has the linear gradient and position absolute to position at bottom of parent
    // and also provide a reference for button to center itself
    return <div
        style={
            {
                height: "120px",
                width: "100%",
                position: "absolute",
                left: "0",
                bottom: "0",

                // transparent linear gradient for fade effect
                background: "linear-gradient(#FAFAFA00, #FAFAFAFF)",

                // center button
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        }
    >
        <Button onclick={onclick}>Show More</Button>
    </div>
}