import type { Recipe } from "@prisma/client";
import type { GraphQLContext } from "../context.js";

interface RecipesArgs {
  search?: string | null;
  tag?: string | null;
  difficulty?: "EASY" | "MEDIUM" | "HARD" | null;
}

interface RecipeArgs {
  id: string;
}

export const queryResolvers = {
  async recipes(_parent: unknown, args: RecipesArgs, { prisma, logger }: GraphQLContext) {
    logger.info({ args }, "Query.recipes");

    return prisma.recipe.findMany({
      where: {
        title: args.search ? { contains: args.search, mode: "insensitive" } : undefined,
        tags: args.tag ? { has: args.tag } : undefined,
        difficulty: args.difficulty ?? undefined,
      },
      include: { ingredients: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async recipe(_parent: unknown, args: RecipeArgs, { prisma, logger }: GraphQLContext) {
    logger.info({ id: args.id }, "Query.recipe");

    return prisma.recipe.findUnique({
      where: { id: args.id },
      include: { ingredients: true },
    });
  },
};

// Field resolvers for the Recipe type: Prisma returns createdAt/updatedAt as
// Date objects, but the GraphQL schema declares them as String, so they're
// formatted here (kept simple on purpose — see README for the DateTime
// custom-scalar stretch exercise).
export const recipeFieldResolvers = {
  createdAt: (recipe: Recipe) => recipe.createdAt.toISOString(),
  updatedAt: (recipe: Recipe) => recipe.updatedAt.toISOString(),
};
