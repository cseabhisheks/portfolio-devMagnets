const addService = async (URL, isModify, setModify, UserInputData,work) => {
    const backend = import.meta.env.VITE_BACKEND
    try {
        const isAdd = !isModify ? '/add' : '/modify'
        URL += isAdd
        const data = !isModify ? UserInputData : { ...UserInputData, isModify }
        const method = !isModify ? 'POST' : 'PATCH'
        console.log(URL)
        const req = await fetch(URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await req.json()
        if (res.success) {
            if (!isModify) {
                alert(`${work} card is added`)
            }
            else {
                alert(`${work} card is updated`)
                setModify(false)
            }

        } else {
            console.log(res.err)
        }
    } catch (err) {
        console.log(err)
    }

}

const FetchService = async (URL, setData) => {
    console.log('fetching services...')
    try {
        const req = await fetch(URL, {
            method: 'GET'
        })
        const res = await req.json()
        if (res.success) {
            setData(res.Data)
        }
    

    } catch (err) {
        console.log(res.err)
    }
}

const removeService = async (URL, id,work) => {

    try {
        const req = await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })
        const res = await req.json()
        if (res.success) {
            alert(`${work} card is deleted`)
        } else {
            console.log(res.err)
        }
    } catch (err) {
        console.log(err)
    }
}

const FetchServiceOne = async (URL, id, setData) => {
    console.log('fetching services...one')
    try {
        const req = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        const res = await req.json()
        if (res.success) {
            setData(res.Data[0])
            console.log(res)
        }
        else {
            console.log(res.err)
        }
    } catch (err) {
        console.log(err)
    }
}

export { FetchService, removeService, FetchServiceOne, addService };