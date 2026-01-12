export const aTypeDefs = `
  scalar Date
  type User {
    name: String
    email: String!
    password: String!
  }
  input AddMovieInput {
    id: ID
    plot: String
    genres: [String]
    runtime: Int
    cast: [String]
    poster: String
    title: String!
    fullplot: String
    languages: [String]
    released: Date
    directors: [String]
    rated: String
    awards: AwardsInput
    lastUpdated: String
    year: Int!
    imdb: ImdbInput
    countries: [String]
    type: String
    tomatoes: TomatoesInput
    num_mflix_comments: Int
  }
  input ImdbInput {
    rating: Float!
    votes: Int!
    id: Int!
  }
  input AwardsInput{
    wins: Int!
    nominations: Int!
    text: String!
  }
  input SignupInput {
    email: String!
    name: String
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input TomatoesInput {
    viewer: RatingInput!
    fresh: Int
    critic: RatingInput
    rotten: Int
    dvd: Date
    website: String
    production: String
    lastUpdated: Date!
  }
  type Tomatoes {
    viewer: Rating!
    fresh: Int
    critic: Rating
    rotten: Int
    dvd: Date
    website: String
    production: String
    lastUpdated: Date!
  }
  type Awards {
    wins: Int!
    nominations: Int!
    text: String!
  }
  type Imdb {
    rating: Float!
    votes: Int!
    id: Int!
  }
  type Movie {
    plot: String
    genres: [String!]
    runtime: Int
    cast: [String]
    poster: String
    title: String!
    fullplot: String
    languages: [String]
    released: Date
    directors: [String]
    rated: String
    awards: Awards
    lastUpdated: String
    year: Int!
    imdb: Imdb
    countries: [String]
    type: String
    tomatoes: Tomatoes
    num_mflix_comments: Int
    user_id: ID!
  }
  input RatingInput {
    rating: Float
    numReviews: Int
    meter: Int
  }
  type Rating {
    rating: Float
    numReviews: Int
    meter: Int
  }
`;

export const mutationTypeDefs = `
   signup(input: SignupInput!): User
   login(input: LoginInput!): String!
   addMovie(input: AddMovieInput!): Movie
`;

export const queryTypeDefs = `
  movie: String
  `;
