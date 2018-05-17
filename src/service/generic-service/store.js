export default function Store (db, path) {
    const PATH = path

    const LANGUAGES_AVAILABLE = ['es', 'en']

    async function _getOneEntity(ref, id) {

        let row = null

        await ref.once("value", function(snapshot) {
            row = snapshot.val()
            if(row){
                row["id"] = id
            }
        });

        return row

    }

    function getPath(lang){

        if(!LANGUAGES_AVAILABLE.includes(lang)) {
            throw new Error("Lang not supported. Languages available " + LANGUAGES_AVAILABLE.join(', '))
        }

        return lang + '/' + PATH
    }

    async function all (lang, params) {
        let ref = db.child(getPath(lang))
        let rows = []

        await ref.once("value", function(snapshot) {
            const tmp = snapshot.val()
            for (const k in tmp){
                tmp[k]['id'] = k
                rows.push(
                    tmp[k]
                )
            }
        });

        return rows
    }
    async function one (id, lang) {
        let ref = db.child(getPath(lang) + '/' + id)

        return await _getOneEntity(ref, id);
    }

    async function create (lang, data) {
        let ref = db.child(getPath(lang))

        let row = null
        const key = await ref.push(data).key

        await ref.child(key).once("value", function(snapshot) {
            row = snapshot.val()
            row["id"] = key
        })
        return row
    }

    async function update (id, lang, data) {
        const ref = db.child(getPath(lang) + '/' + id)

        let row = await _getOneEntity(ref, id);

        if (row){

            await ref.update(data)
                .then(function() {
                    row = {}
                })

            await ref.once("value", function(snapshot) {
                row = snapshot.val()
                row["id"] = id
            })

        }

        return row
    }

    async function remove (id, lang) {
        let ref = db.child(getPath(lang) + '/' + id)

        let row = null

        await ref.once("value", function(snapshot) {
            row = snapshot.val()
        })

        if (row) {
            await ref.remove()
        }

        return row
    }

    return {
        one,
        all,
        create,
        update,
        remove
    }
}
