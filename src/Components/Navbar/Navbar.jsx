import { notification,} from '../../assets'
import ProfileImage from '../PlaceholderImage/PlaceholderImage'
import { Link } from 'react-router-dom'
 import { useFetchUser } from '../../datahooks/users/userhooks'
const Navbar = ({ setSidebarOpen, sidebarOpen, title, icon }) => {
    const {user} = useFetchUser
    return (
        <nav className="bg-[#EAF4E2] p-4 z-10 shadow-md flex items-center gap-5 fixed top-0 w-full">
        <button
          className="lg:hidden text-gray-800 z-20"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                sidebarOpen
                  ? "M6 18L18 6M6 6l12 12" // Close icon
                  : "M4 6h16M4 12h16M4 18h16" // Menu icon
              }
            />
          </svg>
        </button>
        <div className="flex items-center gap-[120px] ml-10">
          <div className="flex items-center gap-2 px-20">
            <img src={icon} alt="" />
                    <h1 className="text-[32px] font-bold">{ title}</h1>
          </div>
          <div className="flex items-center gap-10 ml-[50px]">
            <div className="relative">
              <label htmlFor="Search" className="sr-only">
                {" "}
                Search{" "}
              </label>

              <input
                type="text"
                id="Search"
                placeholder=""
                className="w-[300px] rounded-md border-[#6E6E6E] border-2 p-8 py-2.5 pe-10 shadow-sm sm:text-sm"
              />

              <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div>
              {/* <Link to="/notification">
                <img src={notification} alt="" />
              </Link> */}
            </div>
            <div>
              <Link to="/profilesetting">
                <ProfileImage profileImage={user && user.image ? user.image : ''}  />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
