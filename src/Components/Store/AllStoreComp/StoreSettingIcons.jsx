export const Icon1 = ({ isActive, link }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 11.6289V16.1355C3 18.968 3 20.3843 3.87868 21.2643C4.75736 22.1443 6.17157 22.1443 9 22.1443H15C17.8284 22.1443 19.2426 22.1443 20.1213 21.2643C21 20.3843 21 18.968 21 16.1355V11.6289"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
      />
      <path
        d="M7 18.6133H11"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
      <path
        d="M17.7966 3.13941L6.1508 3.16846C4.41263 3.07903 3.96697 4.41751 3.96697 5.07182C3.96697 5.65701 3.89152 6.51012 2.82621 8.11354C1.7609 9.71696 1.84095 10.1933 2.44168 11.3033C2.94025 12.2246 4.20838 12.5844 4.86959 12.645C6.9698 12.6927 7.99162 10.8787 7.99162 9.60387C9.03348 12.8072 11.9965 12.8072 13.3167 12.4409C14.6395 12.0739 15.7726 10.7603 16.04 9.60387C16.1959 11.041 16.6691 11.8797 18.0672 12.4559C19.5154 13.0528 20.7608 12.1405 21.3857 11.5557C22.0106 10.9709 22.4116 9.67256 21.2977 8.24558C20.5295 7.26149 20.2093 6.3344 20.1042 5.37354C20.0432 4.81679 19.9897 4.21853 19.5981 3.83782C19.0257 3.28145 18.2045 3.11264 17.7966 3.13941Z"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const StaffIcon = ({ isActive, link }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 12.6406C2.5 8.16228 2.5 5.92311 3.89124 4.53186C5.28249 3.14062 7.52166 3.14062 12 3.14062C16.4783 3.14062 18.7175 3.14062 20.1088 4.53186C21.5 5.92311 21.5 8.16228 21.5 12.6406C21.5 17.1189 21.5 19.3581 20.1088 20.7494C18.7175 22.1406 16.4783 22.1406 12 22.1406C7.52166 22.1406 5.28249 22.1406 3.89124 20.7494C2.5 19.3581 2.5 17.1189 2.5 12.6406Z"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
      />
      <path
        d="M11 7.64062H17"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
      <path
        d="M7 7.64062H8"
        stroke="#004324"
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
      <path
        d="M7 12.6406H8"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
      <path
        d="M7 17.6406H8"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
      <path
        d="M11 12.6406H17"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
      <path
        d="M11 17.6406H17"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BankIcon = ({ isActive, link }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 9.20969C2 8.01351 2.48238 7.28045 3.48063 6.72491L7.58987 4.43807C9.7431 3.23978 10.8197 2.64062 12 2.64062C13.1803 2.64062 14.2569 3.23978 16.4101 4.43807L20.5194 6.72491C21.5176 7.28045 22 8.01352 22 9.20969C22 9.53405 22 9.69624 21.9646 9.82957C21.7785 10.5301 21.1437 10.6406 20.5307 10.6406H3.46928C2.85627 10.6406 2.22152 10.5301 2.03542 9.82957C2 9.69624 2 9.53405 2 9.20969Z"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
      />
      <path
        d="M11.9961 7.64062H12.0051"
        stroke="#004324"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 10.6406V19.1406M8 10.6406V19.1406"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
      />
      <path
        d="M16 10.6406V19.1406M20 10.6406V19.1406"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
      />
      <path
        d="M19 19.1406H5C3.34315 19.1406 2 20.4837 2 22.1406C2 22.4167 2.22386 22.6406 2.5 22.6406H21.5C21.7761 22.6406 22 22.4167 22 22.1406C22 20.4837 20.6569 19.1406 19 19.1406Z"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
      />
    </svg>
  );
};
export const PlanIcon = ({ isActive, link }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto block"
    >
      <path
        d="M20.016 2.64062C18.9026 2.64062 18 5.32692 18 8.64062H20.016C20.9876 8.64062 21.4734 8.64062 21.7741 8.30517C22.0749 7.96971 22.0225 7.52795 21.9178 6.64443C21.6414 4.31205 20.8943 2.64062 20.016 2.64062Z"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
      />
      <path
        d="M18 8.69489V19.2864C18 20.7981 18 21.5539 17.538 21.8514C16.7831 22.3377 15.6161 21.318 15.0291 20.9479C14.5441 20.642 14.3017 20.4891 14.0325 20.4803C13.7417 20.4707 13.4949 20.6174 12.9709 20.9479L11.06 22.153C10.5445 22.478 10.2868 22.6406 10 22.6406C9.71321 22.6406 9.45546 22.478 8.94 22.153L7.02913 20.9479C6.54415 20.642 6.30166 20.4891 6.03253 20.4803C5.74172 20.4707 5.49493 20.6174 4.97087 20.9479C4.38395 21.318 3.21687 22.3377 2.46195 21.8514C2 21.5539 2 20.7981 2 19.2864V8.69489C2 5.84088 2 4.41388 2.87868 3.52726C3.75736 2.64063 5.17157 2.64062 8 2.64062H20"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.64062H14"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.6406H6"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11.5156C11.6716 11.5156 11 12.1032 11 12.8281C11 13.553 11.6716 14.1406 12.5 14.1406C13.3284 14.1406 14 14.7282 14 15.4531C14 16.178 13.3284 16.7656 12.5 16.7656M12.5 11.5156C13.1531 11.5156 13.7087 11.8808 13.9146 12.3906M12.5 11.5156V10.6406M12.5 16.7656C11.8469 16.7656 11.2913 16.4004 11.0854 15.8906M12.5 16.7656V17.6406"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        className={"block mx-auto"}
        strokeLinecap="round"
      />
    </svg>
  );
  //Location icon
};

export const LocationIcon = ({ isActive, link }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 11.627V16.1336C3 18.9661 3 20.3824 3.87868 21.2624C4.75736 22.1424 6.17157 22.1424 9 22.1424H15C17.8284 22.1424 19.2426 22.1424 20.1213 21.2624C21 20.3824 21 18.9661 21 16.1336V11.627"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
      />
      <path
        d="M7 18.6152H11"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.7966 3.14136L6.1508 3.17041C4.41263 3.08098 3.96697 4.41946 3.96697 5.07377C3.96697 5.65896 3.89152 6.51207 2.82621 8.11549C1.7609 9.71891 1.84095 10.1952 2.44168 11.3053C2.94025 12.2266 4.20838 12.5864 4.86959 12.647C6.9698 12.6947 7.99162 10.8807 7.99162 9.60582C9.03348 12.8092 11.9965 12.8092 13.3167 12.4429C14.6395 12.0759 15.7726 10.7623 16.04 9.60582C16.1959 11.043 16.6691 11.8817 18.0672 12.4579C19.5154 13.0548 20.7608 12.1425 21.3857 11.5577C22.0106 10.9729 22.4116 9.67451 21.2977 8.24753C20.5295 7.26344 20.2093 6.33635 20.1042 5.37549C20.0432 4.81874 19.9897 4.22048 19.5981 3.83977C19.0257 3.2834 18.2045 3.11459 17.7966 3.14136Z"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export const DomainIcon = ({ isActive, link }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 21.1406C19.4255 20.9496 19.7894 20.7018 20.1088 20.3801C21.5 18.9785 21.5 16.7227 21.5 12.2111C21.5 7.69957 21.5 5.44377 20.1088 4.0422C18.7175 2.64063 16.4783 2.64062 12 2.64062C7.52166 2.64062 5.28249 2.64063 3.89124 4.0422C2.5 5.44377 2.5 7.69957 2.5 12.2111C2.5 16.7227 2.5 18.9785 3.89124 20.3801C4.21056 20.7018 4.57453 20.9496 5 21.1406"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 9.14062H21.5"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M7 6.14062H7.00898"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 6.14062H11.009"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.2596 17.0186C9.1796 17.0186 8.71714 17.7981 8.59714 18.2779C8.47714 18.7576 8.47714 20.4966 8.54914 21.2161C8.78914 22.1156 9.38914 22.4874 9.97714 22.6073C10.5171 22.6553 12.7971 22.6373 13.4571 22.6373C14.4171 22.6553 15.1371 22.2955 15.4371 21.2161C15.4971 20.8563 15.5571 18.8775 15.4071 18.2779C15.0891 17.3184 14.36 17.0186 13.76 17.0186M10.2596 17.0186H13.76M10.2596 17.0186C10.2596 16.9586 10.2582 16.1922 10.2596 15.7579C10.2609 15.361 10.226 14.9784 10.4156 14.6282C11.126 13.2154 13.166 13.3593 13.67 14.7985C13.7573 15.0354 13.7626 15.411 13.76 15.7579C13.7567 16.2011 13.76 17.0186 13.76 17.0186"
        stroke={isActive(link) ? "#004324" : "#ffffff"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
