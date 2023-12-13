import { Schema, model } from "mongoose";
import { TCourse, TDetails, TTags } from "./course.interface";

const tagsSchema = new Schema<TTags>({
 name: {type: String},
 isDeleted: {type: Boolean}
})

const detailsSchema = new Schema<TDetails>({
 level:{
  type: String,
  enum: {
   values:['Beginner', 'Intermediate', 'Advanced'],
   message: '{VALUE} is not valid level'
  }
 },
 description:{type: String}
})

const courseSchema = new Schema<TCourse>({
 title:{
  type: String,
  unique: true,
 },
 instructor:{ type: String,},
 categoryId:{type: Schema.Types.ObjectId, ref:'category'},
 price: {type: Number, },
 tags:{type: [tagsSchema],},
 startDate:{type: String,},
 endDate: {type: String},
 language:{type: String},
 provider:{type: String},
 durationInWeeks: {type: Number},
 details: detailsSchema

},
{
 timestamps: true,
},)

export const Course = model<TCourse>('course', courseSchema)