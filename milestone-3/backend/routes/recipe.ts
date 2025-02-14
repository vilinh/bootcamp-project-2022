import Recipe from "../models/recipeSchema";
import express, { Request, Response, Router } from "express";
import { request } from "http";

const router: Router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    const recipes = await Recipe.find({})
    res.send(recipes)
})

router.get("/:recipeName", async (req: Request, res: Response) => {
    const { name } = req.params;
    const recipe = await Recipe.findOne({
        'name': name
    });
    res.send(recipe);
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const {name, description, image, ingredients, instructions } = req.body;
        const recipe = new Recipe({name, description, image, ingredients, instructions});
        await recipe.save();
        res.status(200).json(recipe);
    } catch (err) {
        console.error(err);
    }
})

router.put("/:recipeName/ingredient", async (req: Request, res: Response) => {
    try {
        const recipeName = req.params.recipeName;
        const ingredient = req.body.newIngredient;
        const recipe = await Recipe.findOneAndUpdate({name: recipeName}, {$push: {ingredients: ingredient}})
        res.send(`${recipeName} updated`)
    } catch (err) {
        console.error(err);
    }
})

router.put("/:recipeName/instruction", async (req: Request, res: Response) => {
    try {
        const recipeName = req.params.recipeName;
        const instruction = req.body.newInstruction;
        const recipe = await Recipe.findOneAndUpdate({name: recipeName}, {$push: {instructions: instruction}})
        res.send(`${recipeName} updated`)
    } catch (err) {
        console.error(err);
    }
})

export default router;