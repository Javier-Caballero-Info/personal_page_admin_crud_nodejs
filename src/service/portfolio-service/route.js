import { Ok, OkCreated, EmptyOk, Err, NotFound } from '../../helper/index'

export default function Route (model) {

    async function getAllPortfolios (req, res) {

        try {
            Ok(res)(await model.all(req.params.lang))
        } catch (error) {
            Err(res)(error)
        }

    }

    async function getPortfolio (req, res) {

        try {
            const result = await model.one(req.params.id, req.params.lang)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Portfolio")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    async function postPortfolio (req, res) {
        try {
            const result = await model.create(req.params.lang, req.body)
            OkCreated(res)(result)
        } catch (error) {
            Err(res)(error)
        }
    }

    async function putPortfolio (req, res) {
        try {
            const result = await model.update(req.params.id, req.params.lang, req.body)
            if(result){
                Ok(res)(result)
            }else{
                NotFound(res)("Portfolio")
            }
        } catch (error) {
            Err(res)(error)
        }
    }

    async function deletePortfolio (req, res) {

        try {

            const result = await model.remove(req.params.id, req.params.lang)

            if(result){
                EmptyOk(res)()
            }else{
                NotFound(res)("Portfolio")
            }
        } catch (error) {
            Err(res)(error)
        }

    }

    return {
        getPortfolio,
        getAllPortfolios,
        postPortfolio,
        putPortfolio,
        deletePortfolio
    }
}
