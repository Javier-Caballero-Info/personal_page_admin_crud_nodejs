import { Ok, OkCreated, EmptyOk, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getAllEducations (req, res) {

        try {
            Ok(res)(await model.all(req.params.lang))
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    async function getEducation (req, res) {

        try {
            const result = await model.one(req.params.id, req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Education")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    async function postEducation (req, res) {
        try {
            const result = await model.create(req.params.lang, req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)({"message": error.message})
        }
    }

    async function putEducation (req, res) {
        try {
            const result = await model.update(req.params.id, req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Education")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }
    }

    async function deleteEducation (req, res) {

        try {

            const result = await model.remove(req.params.id, req.params.lang)

            if(result){
                EmptyOk(res)()
            }else{
                NotFound(res)("Education")
            }
        } catch (error) {
            Err(res)({"message": error.message})
        }

    }

    return {
        getEducation,
        getAllEducations,
        postEducation,
        putEducation,
        deleteEducation
    }
}
