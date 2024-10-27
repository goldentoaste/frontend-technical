
import "./App.css";
import { ReviewList } from "$lib/components/ReviewList/ReviewList";
import { Review } from "$lib/types";
import { useEffect, useRef, useState } from "react";
import { getReviews, getReviewsCount } from "$lib/api";

function App() {

    const initialReviewCount = 20;
    const [reviews, setReviews] = useState<Review[]>([]);
    const totalReviewCount = useRef<number>()

    useEffect(() => {
        // load initial amount of reviews
        getReviews(10, initialReviewCount).then(res => {
            setReviews(res)
        });

        getReviewsCount().then(count => {
            totalReviewCount.current = count;
        })
    }, [])

    return (
        <>
            <div className="mainDisplay">
                <ReviewList reviews={reviews} loadMore={() => {}}></ReviewList>
            </div>
        </>
    );
}

export default App;
