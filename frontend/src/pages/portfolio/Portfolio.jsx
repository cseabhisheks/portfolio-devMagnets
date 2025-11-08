import { useState, useEffect } from "react";
import AddProject from "./AddProject";
import { isAuthenticated } from "../../admin/AuthenticatedContext";
import { useContext } from "react";
export default function Portfolio() {
    const [isProjectHover, setProjectHover] = useState(null);
    const [projects, setProjects] = useState([]);
    const backend = import.meta.env.VITE_BACKEND
    const [filter, setFilter] = useState('')
    const changeFilter = (x) => {
        setFilter(x)
    }

    // Fetch all projects
    const fetchProjects = async () => {
        console.log("fetching projects ....");
        try {
            const req = await fetch(`${backend}/portfolio/fetch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filter })
            });
            const res = await req.json();
            if (res.success) {
                setProjects(res.projects);
            } else {
                console.log("error fetching projects from database");
            }
        } catch (err) {
            console.log("err (while fetching the projects list) " + err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [filter]);

    // Admin mode toggle
    const [isAdmin] = useState(true);

    // Delete project
    const deleteProject = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );
        if (!confirmDelete) return;

        try {
            const req = await fetch(`${backend}/portfolio/remove/${id}`, {
                method: "DELETE",
            });
            const res = await req.json();
            if (res.success) {
                alert("Project deleted");
                fetchProjects();
            } else {
                alert("Error deleting project from database");
            }
        } catch (err) {
            console.log("Error while deleting project " + err);
        }
    };

    // Add or modify project
    const [selectProject, setSelectProject] = useState(false);
    const [Project, setProjectDetail] = useState({
        title: "",
        description: "",
        category: "",
        link: "",
        img: "",
    });
    const [modify, setModify] = useState(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setProjectDetail((prev) => ({ ...prev, [name]: value }));
    };

    // Fetch single project for modification
    const modifiedfetchProjects = async (id) => {
        console.log("fetching single project for modify...", id);
        try {
            const req = await fetch(`${backend}/portfolio/fetchOne`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const res = await req.json();
            if (res.success && res.project) {
                setProjectDetail(res.project);
            } else {
                console.log("error fetching single project");
            }
        } catch (err) {
            console.log("err (while fetching the project): " + err);
        }
    };

    // Add or modify project submit
    const addProjectsOnSubmit = async (e) => {
        e.preventDefault();
        const endPoint = selectProject === "new project" ? "add" : "modify";
        const method = selectProject === "new project" ? "POST" : "PATCH";
        const data =
            selectProject === "new project" ? Project : { ...Project, id: modify };

        try {
            const req = await fetch(`${backend}/portfolio/${endPoint}`, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const res = await req.json();
            if (res.success) {
                alert(
                    selectProject === "new project"
                        ? "Project added successfully"
                        : "Project modified successfully"
                );
                fetchProjects();
                setSelectProject(false);
                setProjectDetail({
                    title: "",
                    description: "",
                    category: "",
                    link: "",
                    img: "",
                });
            } else {
                console.log(
                    "Failed to add/modify project due to backend issue " +
                    JSON.stringify(res.err)
                );
            }
        } catch (err) {
            console.log("err while adding/modifying project " + err);
        }
    };
    const Admin = useContext(isAuthenticated).AdminStatus

    return (
        <>
            <div className="capitalize text-textPrimary text-center">
                <h1 className="text-2xl">explore our portfolio</h1>
                <span className="text-xs">
                    discover our projects, creativity, and the work that defines our
                    journey
                </span>
            </div>

            {selectProject && (
                <AddProject
                    onChange={onChange}
                    addProjectsOnSubmit={addProjectsOnSubmit}
                    selectProject={selectProject}
                    setSelectProject={setSelectProject}
                    Project={Project}
                />
            )}

            <div className="capitalize text-textPrimary mt-5">
                {/* Filter */}
                <ul className="grid grid-cols-2 text-xs gap-2 lg:grid-cols-5 lg:text-sm mb-5">
                    {
                        ['all websites', 'business website', 'e-commerce website', 'portfolio website', 'non profit website', 'landing page', 'utilities', 'other'].map((e, idx) => (
                            <li key={idx} className={` text-center border rounded-xl p-2  transition-all cursor-pointer ${filter === e ? 'bg-accent text-dark font-semibold' : 'bg-accent/10 hover:bg-accent  hover:text-bg'}`} onClick={() => changeFilter(e)}>
                                {e}
                            </li>
                        ))
                    }
                </ul>

                {/* Add Button */}
                {Admin&&
                <div className="mx-auto text-xs text-green-60 flex justify-end items-end w-full m-5">
                    <div
                        className="bg-green-400 px-8 py-2 rounded-3xl hover:bg-green-600 hover:text-green-400 cursor-pointer"
                        onClick={() => {
                            setProjectDetail({
                                title: "",
                                description: "",
                                category: "",
                                link: "",
                                img: "",
                            });
                            setSelectProject("new project");
                        }}
                    >
                        add
                    </div>
                </div>
                }

                {/* Project Cards */}
                {projects.length == 0 ? <div className="capitalize text-center">no {filter} projects in portfolio 🥲</div> :
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {projects.map((project, idx) => (
                            <div
                                key={idx}
                                onMouseEnter={() => setProjectHover(idx)}
                                onMouseLeave={() => setProjectHover(null)}
                                className="min-h-[250px] relative overflow-hidden"
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={project.img}
                                    alt=""
                                />
                                {isProjectHover === idx && (
                                    <div className="font-semibold min-h-[50px] p-5 absolute bottom-0 bg-dark/70 w-full">
                                        <h1>{project.title}</h1>
                                        <div className="text-xs text-gray-400">
                                            {project.description}
                                        </div>
                                        <a
                                            href={project.link}
                                            className="text-sm text-accent cursor-pointer hover:border-b-2 pb-1 w-fit border-accent"
                                        >
                                            link &gt;
                                        </a>

                                    {Admin &&
                                        <div className="flex">
                                            <div
                                                className="mx-auto text-xs text-red-600 bg-red-400 w-fit px-4 py-2 rounded-3xl hover:bg-red-600 hover:text-red-400 cursor-pointer"
                                                onClick={() => deleteProject(project._id)}
                                            >
                                                delete
                                            </div>
                                            <div
                                                className="mx-auto text-xs text-orange-600 bg-orange-400 w-fit px-4 py-2 rounded-3xl hover:bg-orange-600 hover:text-orange-400 cursor-pointer"
                                                onClick={async () => {
                                                    setModify(project._id);
                                                    await modifiedfetchProjects(project._id);
                                                    setSelectProject("modify project");
                                                }}
                                            >
                                                modify
                                            </div>
                                        </div>
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}
