
import { FetchService, removeService, FetchServiceOne, addService } from "../../utilities/fetchCall"
import { MdTitle, MdDescription } from "react-icons/md"
import ServiceTemplate from "../../utilities/ServiceTemplate";
import { useState, useEffect } from "react";
import Btn from "../../utilities/Btn";
export default function Work() {
    const backend = import.meta.env.VITE_BACKEND
    // to open or close the form
    const [isFormOpen, setFormOpen] = useState(false)
    // for add data from input tag
    const [ServiceData, setServiceData] = useState({ title: '', author: '', duration: '', description: '', educationQualification: '' })
    const field = [
        { name: 'title', type: 'text', Icon: MdTitle },
        { name: 'author', type: 'text', Icon: MdDescription },
        { name: 'duration', type: 'text', Icon: MdTitle },
        { name: 'description', type: 'text', Icon: MdDescription },
        { name: 'role', type: 'text', Icon: MdTitle },
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
        FetchService(`${backend}/history/fetch`, setFetchServices)
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
        await FetchServiceOne(`${backend}/history/fetchOne`, id, setServiceData)
        setFormOpen(true)
    }
    const remove = async (id) => {
        await removeService(`${backend}/history/remove`, id)
        fetchAllServiceCard()
    }

    // on submit for add or modfying data
    const submit = async (e) => {
        e.preventDefault()
        await addService(`${backend}/history`, isModify, setModify, ServiceData)
        setFormOpen(false)
        fetchAllServiceCard()
    }
    const Admin = false;
    return (<>
        {isFormOpen && <ServiceTemplate setFormOpen={setFormOpen} field={field} onChange={onChange} onSubmit={submit} data={ServiceData} />}

        <div className=" w-full mt-5 capitalize relative ">

            <div className="text-xl text-textPrimary capitalize mb-5">work history</div>
            {Admin &&
                <div className="w-fit mb-5">
                    <Btn color='green' text="add" onClick={add} />
                </div>
            }
            {FetchServices.length == 0 ?
                <div className="text-white text-center">no work history 🥲</div> :
                <div className="flex  flex-col gap-5 w-fit lg:w-fit mb-10 relative ">
                    <div className="text-card w-2 h-full bg-card rounded-xl absolute -right-10"></div>

                    {FetchServices.map((education, idx) => (
                        <div key={idx} className=" text-textPrimary  lg:w-[30vw]  flex flex-col gap-4 p-8 text-sm bg-white/10">
                            <div className="flex justify-between relative  items-center">
                                <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
                                    <div>
                                        <h1 className="font-semibold">{education.title}</h1>
                                        <span className="text-textSecondary">{education.author}</span>

                                    </div>
                                    <div className="bg-dark w-fit px-5 py-1  rounded-2xl flex items-center">{education.duration}</div>
                                </div>
                                <span className="absolute text-accent flex justify-center items-center bg-accent rounded-[100%] w-5 h-5 -right-20">
                                    <span className="w-3 h-3 rounded-full bg-black"></span>
                                </span>
                            </div>
                            <p className="text-textSecondary">{education.description}</p>
                            <button type="button" className="w-fit text-accent uppercase">{education.role} &gt;</button>
                            {Admin &&
                                <div className="flex justify-between">
                                    <Btn color='red' text="delete" onClick={() => remove(education._id)} />
                                    <Btn color='orange' text="modify" onClick={() => modify(education._id)} />
                                </div>
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    </>)
}