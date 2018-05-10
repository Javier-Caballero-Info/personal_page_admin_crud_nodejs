import { Ok, OkCreated, Err, NotFound } from '../../helper/index'

export default function Route (model) {
    // GET /foods/:id
    // Description: Get food by id
    async function getSocialNetwork (req, res) {

        const result = await model.one(req.params.id)
        if(result){
            Ok(res)(result)
        }else{
            NotFound(res)("Social Network")
        }
    }

    // GET /foods
    // Description: Get an array of foods
    async function getSocialNetworks (req, res) {
        Ok(res)(await model.all())
    }

    // POST /foods
    // Description: Create a new food, with name as body
    async function postSocialNetwork (req, res) {
        try {
            const result = await model.create(req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)({"message": error})
        }
    }

    // PUT /foods
    // Description: Edit an existing food, with name as body
    async function putSocialNetwork (req, res) {
        try {
            const result = await model.update(req.params.id, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("SocialNetwork")
            }
        } catch (error) {
            Err(res)({"message": error})
        }
    }

    // DELETE /foods
    // Description: Delete an existing food
    async function deleteSocialNetwork (req, res) {
        const result = await model.remove(req.params.id)

        if(result){
            Ok(res)(result)
        }else{
            NotFound(res)("SocialNetwork")
        }
    }

    return {
        getSocialNetwork,
        getSocialNetworks,
        postSocialNetwork,
        putSocialNetwork,
        deleteSocialNetwork
    }
}
