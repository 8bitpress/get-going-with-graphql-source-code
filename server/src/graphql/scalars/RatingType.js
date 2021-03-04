import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql";

function isValidRating(value) {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

const RatingType = new GraphQLScalarType({
  name: "Rating",
  description: "An integer representing a user rating from 1 and 5, inclusive.",
  // value from the client
  parseValue: value => {
    if (isValidRating(value)) {
      return value;
    }
    throw new ApolloError("Rating must be an integer from 1 and 5");
  },
  // value sent to the client
  serialize: value => {
    // value is a string here...
    if (isValidRating(parseInt(value))) {
      return value;
    }
    throw new ApolloError("Rating must be an integer from 1 and 5");
  },
  // ast value is always in string format
  parseLiteral: ast => {
    const intValue = parseInt(ast.value);
    if (ast.kind === Kind.INT && isValidRating(intValue)) {
      return intValue;
    }
    throw new ApolloError("Rating must be and integer from 1 and 5");
  }
});

export default RatingType;
