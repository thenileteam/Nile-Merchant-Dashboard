import { policies } from "../../utils/formatdate";
import{usePolicyStore} from '../../ZustandStores/policyStore'
const Policy = () => {
  const{closePolicy} = usePolicyStore()
  return (
    <div className="bg-[rgba(0,0,0,0.35)] fixed inset-0 transitions z-50">
      <div className="popUp-wrapper container bg-[#EAF4E2] text-black mt-20 max-w-[600px] mx-auto p-5 h-[500px] overflow-y-scroll relative transitions">
        <button
          className="absolute top-5 right-4 text-lightGreen border border-lightGreen rounded-lg"
          onClick={closePolicy}
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
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-green  text-center font-bold text-[32px] mt-14">
          Terms and Conditions
        </h2>
        <strong className="text-center block text-lightBlack mt-2">
          Welcome to the Nile App! By signing up, accessing, or using our
          services, you agree to comply with and be bound by the following terms
          and conditions. Please read them carefully.
        </strong>
        <article className="mt-2">
          {policies.map((policy) => {
            const { title, id, text } = policy;
            return (
              <div key={id}>
                <h3 className="text-green font-bold mt-2 ">{title}</h3>
                <ul>
                  {text.map((item, index) => {
                    return <li className="mt-1 text-sm" key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          })}
          <p className='text-sm my-4'>
            12. Contact Information For questions or concerns about these terms,
            please contact us at: Email: support@nileapp.com Phone: +234 812 384
            3076
          </p>
          <p  className='text-sm'>By signing up or using the Nile app, you acknowledge that you have read, understood, and agree to these terms and conditions</p>
        </article>
      </div>
    </div>
  );
};

export default Policy;
