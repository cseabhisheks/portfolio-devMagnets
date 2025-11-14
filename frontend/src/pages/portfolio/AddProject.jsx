import {
  MdTitle,
  MdOutlineDescription,
  MdLink,
  MdOutlineCategory,
  MdClose,
  MdCamera,
} from "react-icons/md";

export default function AddProject({
  onChange,
  addProjectsOnSubmit,
  selectProject,
  setSelectProject,
  Project,
}) {
  return (
    <>
      <div className="bg-dark/70 backdrop-blur-lg w-full h-full inset-0 absolute z-[119]"></div>
      <form
        onSubmit={addProjectsOnSubmit}
        className="mb-5 bg-card p-5 gap-5 md:gap-10 min-h-[49vh] flex flex-col absolute h-fit md:w-[50vw] inset-0 m-10 md:m-auto z-[120]"
      >
        <div className="flex justify-between capitalize text-xl md:text-2xl text-gray-300 items-center">
          <h1>{selectProject}</h1>
          <MdClose
            className="w-6 h-6 hover:bg-gray-400/20 hover:text-dark rounded-xl cursor-pointer"
            onClick={() => setSelectProject(false)}
          />
        </div>

        <label htmlFor="title" className="flex items-center">
          <div className="w-10 h-10 bg-dark flex items-center justify-center">
            <MdTitle className="text-lg" />
          </div>
          <input
            className="bg-darkGray w-full h-10 pl-4 text-white/80"
            type="text"
            onChange={onChange}
            name="title"
            id="title"
            placeholder="Title"
            value={Project.title || ""}
          />
        </label>

        <label htmlFor="description" className="flex items-center">
          <div className="w-10 h-10 bg-dark flex items-center justify-center">
            <MdOutlineDescription className="text-lg" />
          </div>
          <input
            className="bg-darkGray w-full h-10 pl-4 text-white/80"
            type="text"
            onChange={onChange}
            name="description"
            id="description"
            placeholder="Description"
            value={Project.description || ""}
          />
        </label>

        <label htmlFor="link" className="flex items-center">
          <div className="w-10 h-10 bg-dark flex items-center justify-center">
            <MdLink className="text-lg" />
          </div>
          <input
            className="bg-darkGray w-full h-10 pl-4 text-white/80"
            type="text"
            onChange={onChange}
            name="link"
            id="link"
            placeholder="Link"
            value={Project.link || ""}
          />
        </label>

        <label htmlFor="img" className="flex items-center">
          <div className="w-10 h-10 bg-dark flex items-center justify-center">
            <MdCamera className="text-lg" />
          </div>
          <input
            className="bg-darkGray w-full h-10 pl-4 text-white/80"
            type="file"
            onChange={onChange}
            name="img"
            id="img"

          />
        </label>

        <label htmlFor="category" className="flex items-center">
          <div className="w-10 h-10 bg-dark flex items-center justify-center">
            <MdOutlineCategory className="text-lg" />
          </div>
          <select
            name="category"
            className="bg-darkGray w-full h-10 pl-4 capitalize text-gray-400"
            onChange={onChange}
            id="category"
            value={Project.category || ""}
          >
            <option value="">Select category</option>
            <option value="portfolio website">Portfolio Website</option>
            <option value="business website">Business Website</option>
            <option value="e-commerce website">E-commerce Website</option>
            <option value="landing page">Landing Page</option>
            <option value="non profit website">Non Profit Website</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
        </label>

        <button
          type="submit"
          className="bg-accent w-fit px-10 py-2 capitalize text-dark font-semibold"
        >
          {selectProject === "modify project" ? "update project" : "add project"}
        </button>
      </form>
    </>
  );
}
