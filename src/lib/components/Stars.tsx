import starSvg from "/star.svg"


export function Stars({ rating }: { rating: number }) {
    return <div
    role="note"
    aria-label={`${rating} stars rating`}
    style={{
        height: "16px",
        // calculate width of element to decide haw much of mask 
        // 16px for star, 2px for gap
        width: 18 * rating + "px",
        background: "#FBBF24",
        mask: `url(${starSvg}) repeat-x`
    }}></div>

}