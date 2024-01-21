import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  tagTypes: ["Contact"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  endpoints: (builder) => ({
    contacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    contact: builder.query({
      query: (id) => `/contacts/${id}`,
    }),
    updateContact: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest, // Corrected: pass rest as the body directly
         }),
         invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useContactsQuery,
  useUpdateContactMutation,
  useAddContactMutation,
  useDeleteContactMutation,
  useContactQuery,
} = contactsApi;
