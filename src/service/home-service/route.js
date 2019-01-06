import { Ok, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getHome (req, res) {

        try {
            const result = await model.one(req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Home")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    async function putHome (req, res) {
        try {
            const result = await model.update(req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Home")
            }
        } catch (error) {
            Err(res)(error)
        }
    }

    return {
        getHome,
        putHome
    }
}
