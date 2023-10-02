import { BACKEND_BASE_URL, SCRIPT_ENDPOINT } from '@/utils'

import { createApi } from '@reduxjs/toolkit/dist/query/react'

import apiSlice from './apiSlice'

const scriptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // upload Script TODO: - Handle payment part
    uploadScript: builder.mutation({
      query: (data) => {
        console.log('Request Data:', data) // Log the request data
        return {
          url: SCRIPT_ENDPOINT,
          body: data,
          method: 'POST',
        }
      },
    }),

    //Submit Script
    submitScript: builder.mutation({
      query: (data) => {
        console.log('data from body', data)
        return {
          url: SCRIPT_ENDPOINT,
          body: data,
          method: 'POST',
        }
      },
    }),

    // fetch all scripts-> for admin

    fetchAllScripts: builder.query({
      query: () => ({
        url: SCRIPT_ENDPOINT,
        method: 'GET',
      }),
    }),

    // fetch all uploads for particular user

    fetchScriptUploads: builder.query({
      query: (id) => {
        return {
          url: `${SCRIPT_ENDPOINT}/${id}`,
          method: 'GET',
        }
      },
    }),

    //fetch one Script

    fetchOneScript: builder.query({
      query: (id: string) => ({
        url: `${SCRIPT_ENDPOINT}/view-script/${id}`,
        method: 'GET',
      }),
    }),

    // like Script
    likeScript: builder.mutation({
      query: (id) => ({
        url: `${SCRIPT_ENDPOINT}/like`,
        body: id,
        method: 'POST',
      }),
    }),

    // view all liked
    fetAllLiked: builder.query({
      query: () => ({
        url: `${SCRIPT_ENDPOINT}/like/all-liked`,
        method: 'GET',
      }),
    }),

    // remove from liked list
    deleteLiked: builder.mutation({
      query: (id) => ({
        url: `${SCRIPT_ENDPOINT}/liked/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useUploadScriptMutation,
  useFetchScriptUploadsQuery,
  useFetchAllScriptsQuery,
  useSubmitScriptMutation,
  useFetchOneScriptQuery,
  useDeleteLikedMutation,
  useFetAllLikedQuery,
  useLikeScriptMutation,
} = scriptApiSlice
