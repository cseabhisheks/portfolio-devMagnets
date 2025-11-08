import { FaStar } from "react-icons/fa6";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { useState, useEffect } from "react";
import ServiceTemplate from "../../utilities/ServiceTemplate";
import { MdTitle, MdDescription } from "react-icons/md";
import { FetchService, removeService, FetchServiceOne, addService } from "../../utilities/fetchCall";
import Btn from "../../utilities/Btn";

export default function Recommendation() {
    const backend = import.meta.env.VITE_BACKEND;

    // ====== STATES ======
    const [isFormOpen, setFormOpen] = useState(false);
    const [ServiceData, setServiceData] = useState({
        name: "",
        description: "",
        designation: "",
        img: "",
        rate: ""
    });
    const [FetchServices, setFetchServices] = useState([]);
    const [isModify, setModify] = useState(null);

    // ====== INPUT FIELDS ======
    const field = [
        { name: "name", type: "text", Icon: MdTitle },
        { name: "description", type: "text", Icon: MdDescription },
        { name: "designation", type: "text", Icon: MdTitle },
        { name: "img", type: "text", Icon: MdDescription },
        { name: "rate", type: "number", Icon: MdTitle },
    ];

    // ====== FETCH ALL SERVICES ======
    const fetchAllServiceCard = async () => {
        await FetchService(`${backend}/recommendation/fetch`, setFetchServices);
    };

    useEffect(() => {
        fetchAllServiceCard();
    }, []);

    // ====== INPUT CHANGE ======
    const onChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prev) => ({ ...prev, [name]: value }));
    };

    // ====== ADD / MODIFY FORM HANDLERS ======
    const add = () => {
        setModify(null);
        setServiceData({ name: "", description: "", designation: "", img: "", rate: "" });
        setFormOpen(true);
    };

    const modify = async (id) => {
        setModify(id);
        await FetchServiceOne(`${backend}/recommendation/fetchOne`, id, setServiceData);
        setFormOpen(true);
    };

    const remove = async (id) => {
        await removeService(`${backend}/recommendation/remove`, id);
        fetchAllServiceCard();
    };

    // ====== FORM SUBMIT ======
    const submit = async (e) => {
        e.preventDefault();
        await addService(`${backend}/recommendation`, isModify, setModify, ServiceData);
        setFormOpen(false);
        fetchAllServiceCard();
    };

    // ====== SLIDER LOGIC ======
    const [isPaused, setIsPaused] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [sidx, setIdx] = useState(0);

    const totalReview = FetchServices.length;

    // handle resize
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const rightSlide = () => {
        setIdx((prev) => (prev + 1) % totalReview);
    };

    const leftSlide = () => {
        setIdx((prev) => (prev - 1 + totalReview) % totalReview);
    };

    const customSlide = (idx) => {
        setIdx(idx);
    };

    const isVisible = (idx) => {
        if (totalReview === 0) return false;
        return sidx === idx || (screenWidth >= 768 && sidx === (idx + 1) % totalReview);
    };

    // ====== TOUCH SWIPE ======
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setIsPaused(true);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        const distance = touchStartX - touchEndX;
        const threshold = 50;
        if (distance > threshold) rightSlide();
        else if (distance < -threshold) leftSlide();
        setIsPaused(false);
    };

    // ====== AUTO SLIDE ======
    useEffect(() => {
        if (isPaused || totalReview === 0) return;
        const interval = setInterval(() => {
            setIdx((prev) => (prev + 1) % totalReview);
        }, 3000);
        return () => clearInterval(interval);
    }, [isPaused, totalReview]);

    // ====== STAR GENERATOR ======
    const star = (rate) => {
        const stars = [];
        for (let i = 1; i <= rate; i++) {
            stars.push(<FaStar key={i} className="text-accent" />);
        }
        return stars;
    };


    const Admin = false
    // ====== RENDER ======
    return (
        <>
            {isFormOpen && (
                <ServiceTemplate
                    setFormOpen={setFormOpen}
                    onChange={onChange}
                    field={field}
                    onSubmit={submit}
                    data={ServiceData}
                />
            )}

            <div className="w-full mt-5 capitalize relative">
                {Admin &&
                    <div className="absolute right-0">
                        <Btn color="green" text="add" onClick={add} />
                    </div>
                }
                <div className="text-xl text-textPrimary capitalize">Recommendations</div>

                {/* ====== CARDS CONTAINER ====== */}
                <div
                    className="flex items-center gap-5 h-[300px] w-full justify-center"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {totalReview === 0 ? (
                        <div className="text-textSecondary">No recommendations yet.</div>
                    ) : (
                        FetchServices.map((item, idx) =>
                            isVisible(idx) ? (
                                <div
                                    key={idx}
                                    className="flex w-full md:w-[50%] flex-col gap-4 p-8 text-sm bg-white/10 min-h-[70%] relative"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="text-textPrimary">
                                            <h1 className="font-semibold">{item.name}</h1>
                                            <h2 className="text-textSecondary">{item.designation}</h2>
                                        </div>
                                        <div className="w-[70px] bg-dark overflow-hidden aspect-square rounded-full absolute right-5 -top-4">
                                            <img className="w-full h-full object-cover" src={item.img} alt="" />
                                        </div>
                                    </div>
                                    <p className="text-textSecondary">{item.description}</p>
                                    <div className="flex gap-1 w-fit px-2 py-1 rounded-2xl bg-dark">
                                        {star(item.rate)}
                                    </div>

                                    {Admin && <>
                                        <div className="flex justify-between">
                                            <Btn color="red" text="delete" onClick={() => remove(item._id)} />
                                            <Btn color="orange" text="modify" onClick={() => modify(item._id)} />
                                        </div>
                                    </>}
                                </div>
                            ) : null
                        )
                    )}
                </div>

                {/* ====== SLIDER BUTTONS ====== */}
                {totalReview > 1 && (
                    <div className="text-textPrimary flex justify-center md:justify-between items-center mb-5">
                        <div className="flex gap-2">
                            {FetchServices.map((_, idx) => (
                                <span
                                    key={idx}
                                    onClick={() => customSlide(idx)}
                                    className={`cursor-pointer w-3 md:w-5 h-1 rounded-xl transition-all duration-300 ${isVisible(idx) ? "bg-accent" : "bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="hidden md:flex text-textSecondary items-center gap-3">
                            <FaLessThan onClick={leftSlide} className="text-gray-500 hover:text-white cursor-pointer" />
                            <FaGreaterThan onClick={rightSlide} className="text-gray-500 hover:text-white cursor-pointer" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
