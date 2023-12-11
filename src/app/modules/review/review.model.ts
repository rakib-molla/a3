import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";



const reviewSchema = new Schema<TReview>({
 courseId:{type: Schema.Types.ObjectId, ref:'_id'},
 rating:{
  type: Number,
  min: 1,
  max: 5,
 },
 review:{type: String, min:1, max: 5}
})





export const ReviewModel = model<TReview>('review', reviewSchema);