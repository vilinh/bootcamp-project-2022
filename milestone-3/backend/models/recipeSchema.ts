import { Document, Schema, model } from "mongoose";

export interface IRecipe extends Document {
    name: string;
    description: string;
    image: string;
    ingredients: [string];
    instructions: [string];
}

const RecipeSchema = new Schema<IRecipe>({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    ingredients: {type: [String]},
    instructions: {type: [String]}
});

const Recipe = model<IRecipe>("Recipes", RecipeSchema);

export default Recipe