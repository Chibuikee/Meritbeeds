import AllProducts from "../../components/allProducts/allProductAdmin";
import ItemsUpload from "../../components/ItemsUpload";
// import { CollectUserProfile } from "../../firebase/auth";

function Adminpage() {
  // const [formValue, setFormData] = useState({});
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // }

  return (
    <section>
      <div className="s:ml-[200px]">
        <div className="">
          <h1 className="">Tinuke</h1>Welcome to the Admin dashboard. You can
          manage your store from this page.
        </div>
        <h1 className="text-[red]">
          THIS PAGE IS UNDER DEVELOPMENT, ALTHOUGH ALMOST ALL FEATURES ARE
          FUNCTIONAL, THE STYLING IS YET TO BE DONE DUE TO LACK OF A DESIGN, YOU
          COULD RECOMMEND ONE.
        </h1>
        <ItemsUpload />

        {/* <button
          onClick={CollectUserProfile}
          className="p-1 rounded  bg-[purple]"
        >
          Get user name
        </button> */}
        <AllProducts />
      </div>
    </section>
  );
}

export default Adminpage;
