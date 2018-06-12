import { Ok, OkCreated, EmptyOk, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getAllSocialNetworks (req, res) {

        try {
            Ok(res)(await model.all(req.params.lang))
        } catch (error) {
            Err(res)(error)
        }

    }

    async function getSocialNetwork (req, res) {

        try {
            const result = await model.one(req.params.id, req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Social Network")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    async function postSocialNetwork (req, res) {
        try {
            const result = await model.create(req.params.lang, req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)(error)
        }
    }

    async function putSocialNetwork (req, res) {
        try {
            const result = await model.update(req.params.id, req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Social Network")
            }
        } catch (error) {
            Err(res)(error)
        }
    }

    async function deleteSocialNetwork (req, res) {

        try {

            const result = await model.remove(req.params.id, req.params.lang)

            if(result){
                EmptyOk(res)()
            }else{
                NotFound(res)("Social Network")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    return {
        getSocialNetwork,
        getAllSocialNetworks,
        postSocialNetwork,
        putSocialNetwork,
        deleteSocialNetwork
    }
}
