import { GraphQLError } from "graphql";
import type { Difficulty } from "@prisma/client";
import type { GraphQLContext } from "../context.js";

interface IngredientInput {
  name: string;
  quantity: string;
}

interface RecipeInput {
  title: string;
  description?: string | null;
  emoji?: string | null;
  imageUrl?: string | null;
  ingredients: IngredientInput[];
  steps: string[];
  prepTimeMinutes: number;
  difficulty: Difficulty;
  tags: string[];
}

function notFound(id: string) {
  return new GraphQLError(`Recipe ${id} not found`, {
    extensions: { code: "NOT_FOUND" },
  });
}

export const mutationResolvers = {
  async createRecipe(
    _parent: unknown,
    { input }: { input: RecipeInput },
    { prisma, logger }: GraphQLContext,
  ) {
    logger.info({ title: input.title }, "Mutation.createRecipe");

    return prisma.recipe.create({
      data: {
        title: input.title,
        description: input.description,
        emoji: input.emoji,
        imageUrl: input.imageUrl,
        steps: input.steps,
        prepTimeMinutes: input.prepTimeMinutes,
        difficulty: input.difficulty,
        tags: input.tags,
        ingredients: { create: input.ingredients },
      },
      include: { ingredients: true },
    });
  },

  async updateRecipe(
    _parent: unknown,
    { id, input }: { id: string; input: RecipeInput },
    { prisma, logger }: GraphQLContext,
  ) {
    logger.info({ id }, "Mutation.updateRecipe");

    const exists = await prisma.recipe.findUnique({ where: { id } });
    if (!exists) throw notFound(id);

    return prisma.recipe.update({
      where: { id },
      data: {
        title: input.title,
        description: input.description,
        emoji: input.emoji,
        imageUrl: input.imageUrl,
        steps: input.steps,
        prepTimeMinutes: input.prepTimeMinutes,
        difficulty: input.difficulty,
        tags: input.tags,
        // Simplest approach for a learner: replace all ingredients rather
        // than diffing old vs. new rows.
        ingredients: {
          deleteMany: {},
          create: input.ingredients,
        },
      },
      include: { ingredients: true },
    });
  },

  async deleteRecipe(
    _parent: unknown,
    { id }: { id: string },
    { prisma, logger }: GraphQLContext,
  ) {
    logger.info({ id }, "Mutation.deleteRecipe");

    const exists = await prisma.recipe.findUnique({ where: { id } });
    if (!exists) throw notFound(id);

    // Ingredient rows cascade-delete automatically (see onDelete: Cascade
    // in schema.prisma).
    await prisma.recipe.delete({ where: { id } });
    return true;
  },

  async toggleFavorite(
    _parent: unknown,
    { id }: { id: string },
    { prisma, logger }: GraphQLContext,
  ) {
    logger.info({ id }, "Mutation.toggleFavorite");

    const recipe = await prisma.recipe.findUnique({ where: { id } });
    if (!recipe) throw notFound(id);

    return prisma.recipe.update({
      where: { id },
      data: { isFavorite: !recipe.isFavorite },
      include: { ingredients: true },
    });
  },
};
