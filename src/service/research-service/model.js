
export default function Model ({ store, schema }) {

    async function all (lang) {
        return await store.all(lang)
    }

    async function one (id, lang) {
        return store.one(id, lang)
    }


    async function create (lang, { description, group, project, time, order }) {
        // Make params explicit
        const params = { description, group, project, time, order, lang: lang.toUpperCase() }

        // Perform validation of request schema here
        const validatedParams = await schema.validate('research', params)

        // Call store with the validated params
        return await store.create(lang, validatedParams)
    }

    async function update (id, lang, { description, group, project, time, order }) {
        // Make params explicit
        const params = { description, group, project, time, order, lang: lang.toUpperCase() }

        // Perform validation of request schema here
        const validatedParams = await schema.validate('research', params)

        // Call store with the validated params
        return await store.update(id, lang, validatedParams)
    }
    async function remove (id, lang) {
        return store.remove(id, lang)
    }


    return {
        one,
        all,
        create,
        update,
        remove
    }
}
