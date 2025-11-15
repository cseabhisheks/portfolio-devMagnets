
const mail = async (Form, Route) => {
    const backend = import.meta.env.VITE_BACKEND
    try {
        const res = await fetch(`${backend}/mail/${Route}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Form)
        })
        const response = await res.json()
        if (response.success) {
            alert('message send successfully..')
        }
        else {
            alert('message fail to send!')
        }

    } catch (err) {
      alert(err)
    }
}

export default mail