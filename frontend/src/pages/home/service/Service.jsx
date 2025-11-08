

import ServiceTemplate from "../../../utilities/ServiceTemplate"
import { useEffect, useState } from "react"
import { MdTitle, MdDescription } from "react-icons/md"
import { FetchService, removeService, FetchServiceOne, addService } from "../../../utilities/fetchCall"
import Btn from "../../../utilities/Btn"
export default function Service() {
    const backend = import.meta.env.VITE_BACKEND
    // to open or close the form
    const [isFormOpen, setFormOpen] = useState(false)
    // for add data from input tag
    const [ServiceData, setServiceData] = useState({ title: '', description: '' })
    const field = [
        { name: 'title', type: 'text', Icon: MdTitle },
        { name: 'description', type: 'text', Icon: MdDescription }
    ]
    // for display added data
    const [FetchServices, setFetchServices] = useState([])
    // for modifying 
    const [isModify, setModify] = useState()
    // handle input change
    const onChange = (e) => {
        const { name, value } = e.target
        setServiceData((prev) => ({ ...prev, [name]: value }))
        console.log(ServiceData)
    }
    // fetch all card 
    const fetchAllServiceCard = async () => {
        FetchService(`${backend}/service/fetch`, setFetchServices)
    }
    useEffect(() => {
        fetchAllServiceCard()
        console.log(FetchServices)
    }, [])


    const add = () => {
        setFormOpen(true)
        setServiceData({ title: '', description: '' })
    }
    const modify = async (id) => {
        setModify(id)
        await FetchServiceOne(`${backend}/service/fetchOne`, id, setServiceData)
        setFormOpen(true)
    }
    const remove = async (id) => {
        await removeService(`${backend}/service/remove`, id)
        fetchAllServiceCard()
    }

    // on submit for add or modfying data
    const submit = async (e) => {
        e.preventDefault()
        await addService(`${backend}/service`, isModify, setModify, ServiceData)
        setFormOpen(false)
        fetchAllServiceCard()
    }
    const Admin = false

    return (<>
        {isFormOpen && <ServiceTemplate setFormOpen={setFormOpen} onChange={onChange} field={field} onSubmit={submit} data={ServiceData} />}

        <div className=" w-full mt-5 capitalize relative ">

            {Admin &&
                <div className="absolute right-0">
                    <Btn color='green' text="add" onClick={add} />
                </div>
            }


            <div className="text-xl text-textPrimary capitalize mb-5 ">my serivces</div>

            {FetchServices.length == 0 ?
                <div className="text-white text-center">no service 🥲</div> :
                <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5 ">
                    {
                        FetchServices.map((e, idx) => (
                            <div key={idx} className=" flex flex-col gap-4 p-8 text-sm bg-white/10 hover-effect ">
                                <h1 className="text-textPrimary">{e.title}</h1>
                                <p className="text-textSecondary">{e.description}</p>
                                <a href="/contact" className="w-fit text-accent uppercase hover:border-b-2 border-accent">order now &gt;</a>

                                {Admin && <>
                                    <div className="flex justify-between">
                                        <Btn color='red' text="delete" onClick={() => remove(e._id)} />
                                        <Btn color='orange' text="modify" onClick={() => modify(e._id)} />
                                    </div>
                                </>}

                            </div>
                        ))
                    }
                </div>
            }
        </div>

    </>)
}