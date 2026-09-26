import { queryResolvers, recipeFieldResolvers } from "./recipe.resolvers.js";
import { mutationResolvers } from "./mutation.resolvers.js";

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Recipe: recipeFieldResolvers,
};
