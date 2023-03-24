import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Users"],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      async queryFn() {
        try {
          const quarySnapshop = await getDocs(collection(db, "users"));
          let usersData = [];
          quarySnapshop?.forEach((doc) => {
            usersData.push({ creationId: doc.id, userInfo: { ...doc.data() } });
          });
          return { data: usersData };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Users"],
    }),
    fetchUser: builder.query({
      async queryFn(UserId) {
        try {
          const docSnap = await getDoc(doc(db, "users", UserId));
          if (docSnap.exists()) {
            return { data: docSnap.data() };
          }
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Users"],
    }),
    addToUsers: builder.mutation({
      async queryFn(formData) {
        try {
          const docRef = doc(db, "users", `${formData.userId}`);
          await setDoc(docRef, {
            ...formData,
            createdAt: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Users"],
    }),
    deleteFromUsers: builder.mutation({
      async queryFn(UserId) {
        try {
          await deleteDoc(doc(db, "users", UserId));

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Users"],
    }),
    updateUsers: builder.mutation({
      async queryFn({ userId, formData }) {
        try {
          await updateDoc(doc(db, "users", userId), {
            ...formData,
            createdAt: serverTimestamp(),
          });

          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useAddToUsersMutation,
  useDeleteFromUsersMutation,
  useUpdateUsersMutation,
  useFetchUsersQuery,
  useFetchUserQuery,
} = usersApi;
