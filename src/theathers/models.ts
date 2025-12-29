import { Document, Schema, model } from "mongoose";
interface ILocation {
  address: { street1: string; city: string; state: string; zipcode: string };
  geo: {
    type: string;
    coordinates: number[];
  };
}
export interface ITheatersDocument extends Document {
  theaterId: number;
  location: ILocation;
}
const LocationSchema = new Schema<ILocation>({
  address: {
    street1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  geo: {
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true },
  },
});

const TheaterSchema = new Schema<ITheatersDocument>({
  theaterId: { type: Number, required: true, unique: true },
  location: { type: LocationSchema, required: true },
});

export const Theaters = model<ITheatersDocument>(
  "theaters",
  TheaterSchema,
  "theaters"
);
