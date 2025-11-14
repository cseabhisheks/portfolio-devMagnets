const backend = import.meta.env.VITE_BACKEND;

// cloudinary
const cloudUpload = async (file) => {
    
    const signRes = await fetch(`${backend}/cloudinary/sign`);
    const { timestamp, signature, API_KEY, CLOUD_NAME } = await signRes.json()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)
    formData.append('api_key', API_KEY)
    

    const result = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData
    })
    const id = await result.json()
    return id
}
export { cloudUpload };