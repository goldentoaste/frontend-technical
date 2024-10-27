import { Review } from "$lib/types";
import { useState } from "react";
import ReviewItem from "../ReviewItem/ReviewItem";
import { ShowMoreButton } from "./ShowMore";


export function ReviewList({ reviews, loadMore }: { reviews: Review[], loadMore: () => void }) {

    const [showingMore, setShowMore] = useState(false);

    return <div style={{
        width: "100%",
        height: "100%",
        maxWidth: "1120px",
        columnCount: 3,
        columnFill: "balance",

        // for positioning showmore button
        position: "relative"
    }}>
        {reviews.map((item, index) => (
            <ReviewItem review={item} key={index} />
        ))}

        {!showingMore ? <ShowMoreButton onclick={() => {
            setShowMore(true);
            loadMore();
        }} /> : undefined}

    </div>
}