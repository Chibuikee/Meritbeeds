import AllProducts from "../../components/allProducts/allProductAdmin";
import ItemsUpload from "../../components/ItemsUpload";
import { CollectUserProfile } from "../../firebase/auth";
// import { CollectUserProfile } from "../../firebase/auth";

function Adminpage() {
  // const [formValue, setFormData] = useState({});
  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // }

  return (
    <section>
      <div>
        <div className="">
          <h1>Pelumi</h1>Welcome to the Admin dashboard. You can manage your
          store from this page.
        </div>
        <ItemsUpload />

        <button
          onClick={CollectUserProfile}
          className="p-1 rounded  bg-[purple]"
        >
          Get user name
        </button>
        <AllProducts />
      </div>
    </section>
  );
}

export default Adminpage;
