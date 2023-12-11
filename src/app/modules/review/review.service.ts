import { TReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const creteReviewIntoDB = async(payload: TReview)=>{
 const result = await ReviewModel.create(payload);
 return result;
}

export const ReviewServices = {
 creteReviewIntoDB,
}