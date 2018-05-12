import { Ok, OkCreated, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getAllWorks (req, res) {

        try {
            Ok(res)(await model.all(req.params.lang))
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    async function getWork (req, res) {

        try {
            const result = await model.one(req.params.id, req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Work")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    async function postWork (req, res) {
        try {
            const result = await model.create(req.params.lang, req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)({"message": error.message})
        }
    }

    async function putWork (req, res) {
        try {
            const result = await model.update(req.params.id, req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Work")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }
    }

    async function deleteWork (req, res) {

        try {

            const result = await model.remove(req.params.id, req.params.lang)

            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Work")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    return {
        getWork,
        getAllWorks,
        postWork,
        putWork,
        deleteWork
    }
}
