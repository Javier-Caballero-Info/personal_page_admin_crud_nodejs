import { Ok, OkCreated, EmptyOk, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getAllGifts (req, res) {

        try {
            Ok(res)(await model.all(req.params.lang))
        } catch (error) {
            Err(res)(error)
        }

    }

    async function getGift (req, res) {

        try {
            const result = await model.one(req.params.id, req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Gift")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    async function postGift (req, res) {
        try {
            const result = await model.create(req.params.lang, req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)(error)
        }
    }

    async function putGift (req, res) {
        try {
            const result = await model.update(req.params.id, req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Gift")
            }
        } catch (error) {
            Err(res)(error)
        }
    }

    async function deleteGift (req, res) {

        try {

            const result = await model.remove(req.params.id, req.params.lang)

            if(result){
                EmptyOk(res)()
            }else{
                NotFound(res)("Gift")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    return {
        getGift,
        getAllGifts,
        postGift,
        putGift,
        deleteGift
    }
}
