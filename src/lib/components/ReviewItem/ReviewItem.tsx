import { Review } from "$lib/types";
import { Stars } from "../Stars";
import style from "./ReviewItem.module.css"


export default function ReviewItem({ review }: { review: Review }) {

    return <div className={style.reviewItem + " " + "ver"}>
        <div className="hor" style={{ gap: "12px" }}>
            <img src={review.iconUrl} alt={`Profile icon for ${review.name}`} className={style.iconImage} />
            <div className="ver" style={{ alignItems: "start", justifyContent: "space-between", gap: 0 }}>
                <span className={style.name}>{review.name}</span>
                <span className={style.lighterText}>{review.reviewer_level}</span>
            </div>
        </div>

        <Stars rating={review.grade} />

        <p style={{
            margin: 0
        }}>
            {review.review}
        </p>
    </div>;
}

