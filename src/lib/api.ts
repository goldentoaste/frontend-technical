
import reviewsJson from "reviews.json"
import { Review } from "./types";

/**
 * 
 * @param start index of first review to fetch, used for pagination
 * @param count how many reviews to fetch 
 */
export async function getReviews(start: number, count: number) {
    await new Promise(r => setTimeout(r, 200)); // fake some network delay

    return populateReviewIcon(reviewsJson.slice(start, start + count) as Review[]);

}

export async function getReviewsCount() {
    await new Promise(r => setTimeout(r, 100)); // fake some network delay
    return reviewsJson.length;
}


function populateReviewIcon(reviews: Review[]) {
    reviews.forEach((val) => {
        val.iconUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${val.name}`
    })

    return reviews
}