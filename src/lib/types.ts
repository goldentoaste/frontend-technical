

export type ReviewerLevel = "new" | "renowned critic" | "local guide" | "trusted reviewer"

export interface Review {
    name: string,
    review: string,
    grade: number,
    reviewer_level: ReviewerLevel,

    iconUrl?: string ;
}