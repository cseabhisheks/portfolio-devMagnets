//    <InputTag name='title' type='text' onChange={onChange} Icon={MdTitle} /> 

export default function InputTag({ Icon, type, name, onChange ,value,maxLength}) {
    return (<>
        <label htmlFor="img" className="flex items-center">
            <div className="w-10 h-10 bg-dark flex items-center justify-center">
                <Icon className="text-lg" />
            </div>
            <input
                className="bg-darkGray w-full h-10 pl-4 text-white/80"
                type={type}
                name={name}
                id={name}
                maxLength={100}
                onChange={onChange}
                value={value}
                placeholder={`Enter ${name}`}
            />
        </label>
    </>)
}

