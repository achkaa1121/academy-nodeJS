import { Schema, model, Document, type ObjectId, Types } from "mongoose";
export interface ICommentsDocuments extends Document {
  name: string;
  email: string;
  movie_id: ObjectId;
  text: string;
  date: Date;
}
const CommentsSchema: Schema<ICommentsDocuments> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  movie_id: { type: Types.ObjectId, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});
export const Comments = model<ICommentsDocuments>(
  "comments",
  CommentsSchema,
  "comments"
);
