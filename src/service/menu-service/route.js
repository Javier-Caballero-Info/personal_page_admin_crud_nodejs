import { Ok, OkCreated, EmptyOk, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getAllMenuItems (req, res) {

        try {
            Ok(res)(await model.all(req.params.lang))
        } catch (error) {
            Err(res)(error)
        }

    }

    async function getMenuItem (req, res) {

        try {
            const result = await model.one(req.params.id, req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("MenuItem")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    async function postMenuItem (req, res) {
        try {
            const result = await model.create(req.params.lang, req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)(error)
        }
    }

    async function putMenuItem (req, res) {
        try {
            const result = await model.update(req.params.id, req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("MenuItem")
            }
        } catch (error) {
            Err(res)(error)
        }
    }

    async function deleteMenuItem (req, res) {

        try {

            const result = await model.remove(req.params.id, req.params.lang)

            if(result){
                EmptyOk(res)()
            }else{
                NotFound(res)("MenuItem")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    return {
        getMenuItem,
        getAllMenuItems,
        postMenuItem,
        putMenuItem,
        deleteMenuItem
    }
}
