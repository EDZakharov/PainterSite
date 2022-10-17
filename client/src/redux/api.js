import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/dist/query/react";
import PATH from "../SERV_PATH";
import {logout, resetLocalToken, setBiography, setLocalToken} from "./toolkit";
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

export const staggeredBaseQuery = retry(fetchBaseQuery({
    baseUrl: PATH,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().adminPanel.accessToken
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
                    }
        return headers
    },
}), {
    maxRetries: 0,
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    await mutex.waitForUnlock()
    if(api.endpoint === 'getBio') {

    }
    let result = await staggeredBaseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 409) {
        api.dispatch(logout())

    }
    if (!result.error && result.data.accessToken) {
        api.dispatch(setLocalToken(result.data.accessToken))
    }

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await staggeredBaseQuery('refresh', api, extraOptions)
                if (refreshResult.data) {
                    api.dispatch(resetLocalToken(refreshResult.data.accessToken))
                    result = await staggeredBaseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await staggeredBaseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const api = createApi({
    reducerPath: "api",
    tagTypes: ['apiData'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});

const workspace = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: ({email, password}) => ({
                url: 'login',
                method: 'POST',
                body: {email, password},
            }),
            invalidatesTags: ["apiData"],
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'apiData', id})),
                        {type: 'apiData', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'apiData', id: 'LIST'}],
        }),
        logout: build.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            invalidatesTags: ["apiData"],
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'apiData', id})),
                        {type: 'apiData', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'apiData', id: 'LIST'}],
        }),

        refresh: build.query({
            query: () => ({
                url: 'refresh',
                method: 'GET',
            }),
            invalidatesTags: ["apiData"],
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'apiData', id})),
                        {type: 'apiData', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'apiData', id: 'LIST'}],
        }),
        getBio: build.query({
            query: () => ({
                url: 'biography',
                method: 'GET',
            }),
            invalidatesTags: ["apiData"],
        }),
        patchBio: build.mutation({
            query: (body) => ({
                url: 'patchBio',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ["apiData"],
        }),
        getImages: build.query({
            query: () => 'images',
            invalidatesTags: ["apiData"],
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'apiData', id})),
                        {type: 'apiData', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'apiData', id: 'LIST'}],
            // extraOptions: { maxRetries: 5 }
        }),
        setImage: build.mutation({
            query: (dto) => {
                // console.log(dto)
                if (
                    (dto.file && dto.file.type === "image/png") ||
                    dto.file.type === "image/jpeg" ||
                    dto.file.type === "image/jpg"
                ) {
                    const data = new FormData();
                    // const blob = new Blob([dto.description], { type: "text/xml"});
                    data.append("image", dto.file);
                    data.append("image", dto.description);

                    // data.append("image", blob);
                    return {
                        url: 'upload',
                        method: 'POST',
                        body: data,
                        mode:'no-cors'
                    }
                } else {
                    throw new Error('invalid data type')
                }

            },
            invalidatesTags: ["apiData"],
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'apiData', id})),
                        {type: 'apiData', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'apiData', id: 'LIST'}],
        }),
        delImage: build.mutation({
            query: (name) => {
                return {
                    url: 'delete',
                    method: 'DELETE',
                    body: {name: name}
                }
            },
            invalidatesTags: ["apiData"],
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'apiData', id})),
                        {type: 'apiData', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'apiData', id: 'LIST'}],
        }),
        changeImageDescription: build.mutation({
            query: (data) => {
                return {
                    url: 'patch',
                    method: 'PATCH',
                    body: {name: data.name, description: data.description}
                }
            },
            invalidatesTags: ["apiData"],
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({id}) => ({type: 'apiData', id})),
                        {type: 'apiData', id: 'LIST'},
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                    [{type: 'apiData', id: 'LIST'}],
        })
    })
})

export const {usePatchBioMutation, useGetBioQuery, useLoginMutation, useLogoutMutation, useGetImagesQuery, useSetImageMutation, useDelImageMutation, useChangeImageDescriptionMutation} = workspace;

