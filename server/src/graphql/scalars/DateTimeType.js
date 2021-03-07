import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import validator from "validator";

const DateTimeType = new GraphQLScalarType({
  name: "DateTime",
  description: "An ISO 8601-encoded UTC date string.",
  // value from the client
  parseValue: value => {
    if (validator.isISO8601(value)) {
      return value;
    }
    throw new ApolloError("DateTime must be a valid ISO 8601 date string");
  },
  // value sent to the client
  serialize: value => {
    if (validator.isISO8601(value)) {
      return value;
    }
    throw new ApolloError("DateTime must be a valid ISO 8601 date string");
  },
  // ast value is always in string format
  parseLiteral: ast => {
    if (validator.isISO8601(ast.value)) {
      return ast.value;
    }
    throw new ApolloError("DateTime must be a valid ISO 8601 date string");
  }
});

export default DateTimeType;
