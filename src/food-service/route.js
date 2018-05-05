/*
 * src/food-service/route.js 
 **/

import { Ok, OkCreated, Err, NotFound } from '../helper'

export default function Route (model) {
    // GET /foods/:id
    // Description: Get food by id
    async function getFood (req, res) {

        const result = await model.one(req.params.id)
        if(result){
            Ok(res)(result)
        }else{
            NotFound(res)("Food")
        }
    }

    // GET /foods
    // Description: Get an array of foods
    async function getFoods (req, res) {
        Ok(res)(await model.all())
    }

    // POST /foods
    // Description: Create a new food, with name as body
    async function postFood (req, res) {
        try {
            const result = await model.create(req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)({"message": error})
        }
    }

    // PUT /foods
    // Description: Edit an existing food, with name as body
    async function putFood (req, res) {
        try {
            const result = await model.update(req.params.id, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Food")
            }
        } catch (error) {
            Err(res)({"message": error})
        }
    }

    // DELETE /foods
    // Description: Delete an existing food
    async function deleteFood (req, res) {
        const result = await model.remove(req.params.id)

        if(result){
            Ok(res)(result)
        }else{
            NotFound(res)("Food")
        }
    }

    return {
        getFood,
        getFoods,
        postFood,
        putFood,
        deleteFood
    }
}
