import { PrismaClient, Difficulty } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();

  await prisma.recipe.create({
    data: {
      title: "Fluffy Pancakes",
      description: "Weekend breakfast classic, best served with maple syrup.",
      emoji: "🥞",
      prepTimeMinutes: 20,
      difficulty: Difficulty.EASY,
      tags: ["breakfast", "sweet", "quick"],
      steps: [
        "Whisk flour, sugar, baking powder and salt together.",
        "Mix in milk, eggs and melted butter until just combined.",
        "Cook spoonfuls of batter on a hot, greased pan until bubbles form, then flip.",
        "Serve warm with syrup and butter.",
      ],
      ingredients: {
        create: [
          { name: "Flour", quantity: "1.5 cups" },
          { name: "Milk", quantity: "1.25 cups" },
          { name: "Eggs", quantity: "1" },
          { name: "Baking powder", quantity: "3.5 tsp" },
          { name: "Sugar", quantity: "1 tbsp" },
        ],
      },
    },
  });

  await prisma.recipe.create({
    data: {
      title: "Creamy Tomato Pasta",
      description: "A quick weeknight dinner the whole family loves.",
      emoji: "🍝",
      prepTimeMinutes: 30,
      difficulty: Difficulty.MEDIUM,
      tags: ["dinner", "vegetarian", "italian"],
      steps: [
        "Cook pasta in salted boiling water until al dente.",
        "Saute garlic in olive oil, then add crushed tomatoes.",
        "Simmer, stir in cream and basil, season to taste.",
        "Toss with the drained pasta and serve.",
      ],
      ingredients: {
        create: [
          { name: "Pasta", quantity: "400g" },
          { name: "Crushed tomatoes", quantity: "1 can" },
          { name: "Garlic", quantity: "2 cloves" },
          { name: "Heavy cream", quantity: "100ml" },
          { name: "Fresh basil", quantity: "a handful" },
        ],
      },
    },
  });

  await prisma.recipe.create({
    data: {
      title: "Slow-Roasted Beef Brisket",
      description: "Low and slow for melt-in-your-mouth results.",
      emoji: "🍖",
      prepTimeMinutes: 300,
      difficulty: Difficulty.HARD,
      tags: ["dinner", "meat", "special occasion"],
      isFavorite: true,
      steps: [
        "Rub the brisket with the spice mix and let it rest for an hour.",
        "Sear all sides in a hot pan.",
        "Roast covered at low temperature for 4-5 hours.",
        "Rest for 20 minutes before slicing against the grain.",
      ],
      ingredients: {
        create: [
          { name: "Beef brisket", quantity: "2kg" },
          { name: "Paprika", quantity: "2 tbsp" },
          { name: "Brown sugar", quantity: "1 tbsp" },
          { name: "Garlic powder", quantity: "1 tsp" },
        ],
      },
    },
  });

  console.log("Seed data created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
