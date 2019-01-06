
export default function Model ({ store, schema }) {

    async function one (lang) {
        let row = store.getSingletonModel(lang)
        delete row['menu']
        return row
    }

    async function update (lang, { picture, title, subtitle }) {
        // Make params explicit
        const params = { picture, title, subtitle, lang: lang.toUpperCase() }

        // Perform validation of request schema here
        const validatedParams = await schema.validate('home', params)

        // Call store with the validated params
        return await store.updateSingletonModel(lang, validatedParams)
    }

    return {
        one,
        update
    }
}
