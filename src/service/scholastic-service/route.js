import { Ok, OkCreated, EmptyOk, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getAllScholastic (req, res) {

        try {
            Ok(res)(await model.all(req.params.lang))
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    async function getScholastic (req, res) {

        try {
            const result = await model.one(req.params.id, req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Scholastic")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    async function postScholastic (req, res) {
        try {
            const result = await model.create(req.params.lang, req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)({"message": error.message})
        }
    }

    async function putScholastic (req, res) {
        try {
            const result = await model.update(req.params.id, req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Scholastic")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }
    }

    async function deleteScholastic (req, res) {

        try {

            const result = await model.remove(req.params.id, req.params.lang)

            if(result){
                EmptyOk(res)()
            }else{
                NotFound(res)("Scholastic")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    return {
        getScholastic,
        getAllScholastic,
        postScholastic,
        putScholastic,
        deleteScholastic
    }
}
