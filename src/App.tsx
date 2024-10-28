
import "./App.css";
import { ReviewList } from "$lib/components/ReviewList/ReviewList";
import { Review } from "$lib/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { getReviews, getReviewsCount } from "$lib/api";

function App() {

    const initialReviewCount = 20;
    const [reviews, setReviews] = useState<Review[]>([]);
    const totalReviewCount = useRef<number>(0)
    const isloading = useRef(false);

    const loadMoreReviews = useCallback(async () => {
        if (isloading.current) {
            // cancel lodaing requests if already loading
            return;
        }
        isloading.current = true;
        if (reviews.length < totalReviewCount.current) {
            const res = await getReviews(reviews.length, 8)

            // setReviews([...reviews, ...res]);
            setReviews(reviews.concat(res));
            isloading.current = false;
        }
    }, [reviews])

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

        <div className="mainDisplay">
            <p 
            className="heading"
            style={{
                color: "var(--highlight)",
                fontWeight: "600",
                fontSize: "12px",
                lineHeight: "15px"
            }}>Reviews</p>
            <h1 style={{
                margin: "8px",
                fontSize: "29px",
                fontWeight: "600",
                lineHeight: "33px"
            }}>What our customers are saying 🍦🫶🏼</h1>
            <p
                className="description"
                style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: "400",
                    maxWidth: "800px"
                }}>At The Cone Zone, we're proud to serve up smiles with every scoop! Check out what our customers have to say about their favorite flavors, experiences, and sweet moments.</p>
            <ReviewList reviews={reviews} loadMore={loadMoreReviews} stopLoading={reviews.length >= totalReviewCount.current}></ReviewList>
        </div>

    );
}

export default App;
