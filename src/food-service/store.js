/*
 * src/food-service/store.js
 **/

export default function Store (db) {
    // When calling external services, prefix the function with fetch
    // e.g. When calling food service
    // async function fetchFood () {
    //  return request('http://localhost:3000/foods/1')
    // }

    // one, all, create, update, delete, count, search is reserved for DB only operation

    async function all (params) {
        let ref = db.child("/food")
        let rows = []

        await ref.once("value", function(snapshot) {
            const tmp = snapshot.val()
            for (const k in tmp){
                const i = tmp[k]
                i['id'] = k
                rows.push(
                    tmp[k]
                )
            }
        });

        return rows
    }
    async function one (id) {
        let ref = db.child('/food/' + id)
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
        let ref = db.child('/food')

        let row = null
        const key = await ref.push(data).key

        await ref.child(key).once("value", function(snapshot) {
            row = snapshot.val()
            row["id"] = key
        })
        return row
    }

    async function update (id, data) {
        const ref = db.child('/food/' + id)

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
        let ref = db.child('/food/' + id)

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
