export default function Store (db, path) {
    
    const PATH = path

    async function all (params) {
        let ref = db.child(path)
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
    async function one (id) {
        let ref = db.child(PATH + '/' + id)
        let row = null

        await ref.once("value", function(snapshot) {
            row = snapshot.val()
            if(row){
                row["id"] = id
            }
        });

        return row
    }

    async function create (data) {
        let ref = db.child(PATH)

        let row = null
        const key = await ref.push(data).key

        await ref.child(key).once("value", function(snapshot) {
            row = snapshot.val()
            row["id"] = key
        })
        return row
    }

    async function update (id, data) {
        const ref = db.child(PATH + '/' + id)

        let row = null

        await ref.once("value", function(snapshot) {
            row = snapshot.val()
            if(row){
                row["id"] = id
            }
        })

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

    async function remove (id) {
        let ref = db.child(PATH + '/' + id)

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
