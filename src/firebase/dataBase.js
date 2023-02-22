import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "./config";

export function useWriteDb(formData) {
  const productsRef = collection(db, "products");
  async function writeDb() {
    try {
      await addDoc(productsRef, formData);
      toast("Merit this product has been added, congrats", {
        type: "success",
      });
    } catch (error) {
      toast("This value is not updated, try again", { type: "error" });
    }
  }

  return writeDb;
}
export function useFetchAllProducts() {
  const [allProductsFetched, setAllProductsFetched] = useState("");
  const productRef = collection(db, "products");
  useEffect(() => {
    async function fetchProducts() {
      const Data = await getDocs(productRef);
      const productsData = Data?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProductsFetched(productsData);
      console.log(productsData);
    }
    fetchProducts();
  }, []);
  return allProductsFetched;
}

// const q = query(CommentRef, orderBy("createdAt", "description"))
