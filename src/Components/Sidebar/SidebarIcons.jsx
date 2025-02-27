export const DashboardIcon = ({isActive,path}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 10.8262C8.59721 10.8262 10.5 8.92338 10.5 6.57617C10.5 4.22896 8.59721 2.32617 6.25 2.32617C3.90279 2.32617 2 4.22896 2 6.57617C2 8.92338 3.90279 10.8262 6.25 10.8262Z"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
      />
      <path
        d="M18 9.68331V10.8262M18 9.68331C16.9878 9.68331 16.0961 9.17824 15.573 8.41134M18 9.68331C19.0122 9.68331 19.9039 9.17824 20.427 8.41134M15.573 8.41134L14.5004 9.11188M15.573 8.41134C15.2637 7.95776 15.0833 7.4126 15.0833 6.82617C15.0833 6.23981 15.2636 5.69471 15.5729 5.24117M20.427 8.41134L21.4996 9.11188M20.427 8.41134C20.7363 7.95776 20.9167 7.4126 20.9167 6.82617C20.9167 6.23981 20.7364 5.69471 20.4271 5.24117M18 3.96903C19.0123 3.96903 19.9041 4.47417 20.4271 5.24117M18 3.96903C16.9877 3.96903 16.0959 4.47417 15.5729 5.24117M18 3.96903V2.82617M20.4271 5.24117L21.5 4.54046M15.5729 5.24117L14.5 4.54046"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17.75 22.3262C20.0972 22.3262 22 20.4234 22 18.0762C22 15.729 20.0972 13.8262 17.75 13.8262C15.4028 13.8262 13.5 15.729 13.5 18.0762C13.5 20.4234 15.4028 22.3262 17.75 22.3262Z"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
      />
      <path
        d="M6.25 22.3262C8.59721 22.3262 10.5 20.4234 10.5 18.0762C10.5 15.729 8.59721 13.8262 6.25 13.8262C3.90279 13.8262 2 15.729 2 18.0762C2 20.4234 3.90279 22.3262 6.25 22.3262Z"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export const ProductIcon = ({isActive, path}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 22.6406C12.1818 22.6406 11.4002 22.2994 9.83691 21.617C8.01233 20.8206 6.61554 20.2109 5.64648 19.6406H2M13 22.6406C13.8182 22.6406 14.5998 22.2994 16.1631 21.617C20.0544 19.9185 22 19.0692 22 17.6406V7.14062M13 22.6406V11.6406M4 7.14062V10.1406"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.32592 10.332L6.40472 8.91848C4.80157 8.14273 4 7.75485 4 7.14062C4 6.5264 4.80157 6.13852 6.40472 5.36277L9.32592 3.94924C11.1288 3.07683 12.0303 2.64062 13 2.64062C13.9697 2.64062 14.8712 3.07682 16.6741 3.94924L19.5953 5.36277C21.1984 6.13852 22 6.5264 22 7.14062C22 7.75485 21.1984 8.14273 19.5953 8.91848L16.6741 10.332C14.8712 11.2044 13.9697 11.6406 13 11.6406C12.0303 11.6406 11.1288 11.2044 9.32592 10.332Z"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1366 4.65625L7.86719 9.62547"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 13.6406H5"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 16.6406H5"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const CustomerIcon = ({isActive, path}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.08069 15.937C3.86241 16.6741 0.668176 18.1792 2.61368 20.0626C3.56404 20.9826 4.62251 21.6406 5.95325 21.6406H13.5468C14.8775 21.6406 15.936 20.9826 16.8863 20.0626C18.8318 18.1792 15.6376 16.6741 14.4193 15.937C11.5625 14.2085 7.93752 14.2085 5.08069 15.937Z"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 7.64062C13.5 9.84977 11.7091 11.6406 9.5 11.6406C7.29086 11.6406 5.5 9.84977 5.5 7.64062C5.5 5.43148 7.29086 3.64062 9.5 3.64062C11.7091 3.64062 13.5 5.43148 13.5 7.64062Z"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
      />
      <path
        d="M17 5.64062H22"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8.64062H22"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 11.6406H22"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const OrderIcon = ({isActive, path}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 22.6406C12.1818 22.6406 11.4002 22.2994 9.83691 21.617C8.01233 20.8206 6.61554 20.2109 5.64648 19.6406H2M13 22.6406C13.8182 22.6406 14.5998 22.2994 16.1631 21.617C20.0544 19.9185 22 19.0692 22 17.6406V7.14062M13 22.6406V11.6406M4 7.14062V10.1406"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.32592 10.332L6.40472 8.91848C4.80157 8.14273 4 7.75485 4 7.14062C4 6.5264 4.80157 6.13852 6.40472 5.36277L9.32592 3.94924C11.1288 3.07683 12.0303 2.64062 13 2.64062C13.9697 2.64062 14.8712 3.07682 16.6741 3.94924L19.5953 5.36277C21.1984 6.13852 22 6.5264 22 7.14062C22 7.75485 21.1984 8.14273 19.5953 8.91848L16.6741 10.332C14.8712 11.2044 13.9697 11.6406 13 11.6406C12.0303 11.6406 11.1288 11.2044 9.32592 10.332Z"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.1366 4.65625L7.86719 9.62547"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 13.6406H5"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 16.6406H5"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FinancialIcon = ({isActive, path}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M20 17.6406H4"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0001 14.6406C17.0001 14.6406 20 16.8501 20 17.6406C20 18.4312 17 20.6406 17 20.6406"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M5 7.64062H20"
        stroke={isActive(path) ? "#fff" : "#004324"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99998 4.64062C6.99998 4.64062 4.00001 6.8501 4 7.64065C3.99999 8.43121 7 10.6406 7 10.6406"
        stroke={isActive(path) ? "#fff" : "#004324"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
