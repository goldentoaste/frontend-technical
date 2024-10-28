import { Review } from "$lib/types";
import { useEffect, useRef, useState } from "react";
import ReviewItem from "../ReviewItem/ReviewItem";
import { ShowMoreButton } from "./ShowMore";



export function ReviewList({ reviews, loadMore, stopLoading }: { reviews: Review[], loadMore: () => void, stopLoading: boolean }) {

    const [showingMore, setShowMore] = useState(false);

    const [columns, setColumns] = useState(3);

    const containerDiv = useRef<HTMLDivElement>(null);
    const eolDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // whenever size change, update # of columns
        const resizeHandle = () => {
            if (window.innerWidth < 500) {
                columns != 1 && setColumns(1);
            } else if (window.innerWidth < 800) {
                columns != 2 && setColumns(2);
            } else if (window.innerWidth > 800) {
                columns != 3 && setColumns(3);
            }
        }
        window.addEventListener("resize", resizeHandle)
        // immediate trigger resize
        resizeHandle()

        return () => {
            window.removeEventListener("resize", resizeHandle)
        }
        // janky bs, columns in inner function closure, need to recreate function each time
    }, [columns]
    )

    useEffect(() => {
        const observer = new IntersectionObserver((e) => {
            if (e.length > 0 && e[0].isIntersecting && showingMore) {
                loadMore()
            }
        }, {
            root: null, // observer target is the entire view port
            rootMargin: "100px",
            threshold: 1
        })

        if (!stopLoading) {
            observer.observe(eolDiv.current!)
        }

        return () => {
            observer.disconnect()
        }
    }, [showingMore, loadMore, stopLoading])

    return <div className="hor" style={{
        width: "100%",
        height: "100%",
        maxWidth: "1120px",

        // for positioning showmore button
        position: "relative",

        gap: "16px",
        justifyContent: "center"
    }}
        ref={containerDiv}
    >

        {
            // show loading message
            reviews.length == 0 ? <h2>Loading...</h2> : undefined
        }

        {[...Array(columns).keys()].map((val) =>
        // create multiple flex columns, then distribute items amongst them
        // column count depends on current screen size.
        {
            return <div id={val + ""} key={val} className="ver" style={{ gap: "12px" }}>
                {reviews.filter((_, index) => index % columns == val).map((rev, index) =>
                    // note using index as key is fine since for each item, it's index won't change after created, in this case.
                    <ReviewItem review={rev} key={index}></ReviewItem>
                )}
            </div>
        }
        )}

        <div
            ref={eolDiv}
            style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "50px",
                zIndex: 100
                // used for detecting reaching end of list
            }}></div>

        {!showingMore ? <ShowMoreButton onclick={() => {
            setShowMore(true);
            loadMore();
        }} /> : undefined}

    </div>
}