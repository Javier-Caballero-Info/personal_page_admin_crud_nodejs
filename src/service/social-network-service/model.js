
export default function Model ({ store, schema }) {

  async function one (id) {
    return store.one(id)
  }

  async function all () {
    return await store.all()
  }

  async function create ({ name, link, img, order, lang }) {
    // Make params explicit
    const params = { name, link, img, order, lang }

    // Perform validation of request schema here
    const validatedParams = await schema.validate('social-network', params)

    // Call store with the validated params
    return await store.create(validatedParams)
  }

  async function update (id, { name, link, img, order, lang }) {
    // Make params explicit
    const params = { name, link, img, order, lang }

    // Perform validation of request schema here
    const validatedParams = await schema.validate('social-network', params)

    // Call store with the validated params
    return await store.update(id, validatedParams)
  }
  async function remove (id) {
    return store.remove(id)
  }


  return {
    one,
    all,
    create,
    update,
    remove
  }
}
