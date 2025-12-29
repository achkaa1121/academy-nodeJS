import { Document, Schema, model } from "mongoose";
export interface ISessionsDocument extends Document {
  user_id: string;
  jwt: string;
}
const SessionsSchema: Schema<ISessionsDocument> = new Schema({
  user_id: { type: String, required: true },
  jwt: { type: String, required: true },
});
export const Sessions = model<ISessionsDocument>(
  "sessions",
  SessionsSchema,
  "sesions"
);
