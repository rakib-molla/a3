import { Request, Response } from "express";
import { ReviewServices } from "./review.service";

const createReview = async (req: Request, res: Response) => {
 try {
   const { rating } = req.body;
   const data = req.body;

   // check rating is lower than five 
   if (rating <= 5) {
     const result = await ReviewServices.creteReviewIntoDB(data);
     res.status(201).json({
       success: true,
       statusCode: 201,
       message: 'Review created successfully',
       data: result,
     });
   } else {
     res.status(400).json({
       success: false,
       statusCode: 400,
       message: 'Rating must be lower than or equal to 5',
       data: null,
     });
   }
 } catch (error) {
   res.status(500).json({
     success: false,
     statusCode: 500,
     message: 'Review creation failed',
     data: error,
   });
 }
};


export const ReviewControllers = {
 createReview,
}