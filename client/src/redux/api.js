import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/dist/query/react";
import PATH from "../SERV_PATH";
import {logout, resetLocalToken, setLocalToken, setNews} from "./toolkit";
import {Mutex} from 'async-mutex'

const mutex = new Mutex()

//RETRY
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

//REAUTH
const baseQueryWithReauth = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await staggeredBaseQuery(args, api, extraOptions)
    if(
        (result && api.endpoint === 'getNews') ||
        (result && api.endpoint === 'postNews') ||
        (result && api.endpoint === 'patchNews') ||
        (result && api.endpoint === 'deleteNews')
    ){
        api.dispatch(setNews(result.data))
    }


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

//CREATE_API
export const api = createApi({
    reducerPath: "api",
    tagTypes: ['apiData'],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});

//COMMON
const retRes = (result) => {
    if(result){
        return [...result.map(({id}) => ({type: 'apiData', id})), {type: 'apiData', id: 'LIST'},]
    } else {
        return [{type: 'apiData', id: 'LIST'}]
    }
}

const checkArgs = (args) => {
    if(args === 1){
        return {
            url: 'imagesByCategory',
            params: {"category": "Canvas"}
        }
    }
    if(args === 2){
        return {
            url: 'imagesByCategory',
            params: {"category": "Paper"}
        }
    }
    if(args === 3){
        return {
            url: 'imagesByCategory',
            params: {"category": "Else"}
        }
    }
}

const uploadImagesChecker = (dto) => {
        if (
            (dto.file && dto.file.type === "image/png") ||
            dto.file.type === "image/jpeg" ||
            dto.file.type === "image/jpg"
        ) {
            const data = new FormData();
            data.append("image", dto.file);
            data.append("image", dto.description);
            data.append("category", dto.categories);
            data.append("sizes", dto.sizes);
            data.append("imageName", dto.name);

            return {
                url: 'upload',
                method: 'POST',
                body: data
            }
        } else {
            throw new Error('invalid data type')
        }
}

//WORKSPACE
const workspace = api.injectEndpoints({
    endpoints: (build) => ({
        //AUTH
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
            providesTags: retRes
        }),

        //BIOGRAPHY
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

        //IMAGES
        getImages: build.query({
            query: () => 'images',
            invalidatesTags: ["apiData"],
            providesTags: retRes
        }),
        getImageByCategoryName: build.query({
            query: checkArgs,
            invalidatesTags: ["apiData"],
            providesTags: retRes
        }),
        setImage: build.mutation({
            query: uploadImagesChecker,
            invalidatesTags: ["apiData"],
            providesTags: retRes
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
            providesTags: retRes
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
            providesTags: retRes
        }),

        //CONTACTS
        getContacts: build.query({
            query: () => ({
                url: 'contacts',
                method: 'GET',
            }),
            invalidatesTags: ["apiData"],
        }),
        patchContacts: build.mutation({
            query: (body) => ({
                url: 'patchContacts',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ["apiData"],
        }),

        //ORDERS
        getOrders: build.query({
            query: () => ({
                url: 'getUsersContacts',
                method: 'GET',
            }),
            invalidatesTags: ["apiData"],
        }),
        setOrder: build.mutation({
            query: (body) => ({
                url: 'postUsersContacts',
                method: 'POST',
                body
            }),
            invalidatesTags: ["apiData"],
            providesTags: retRes
        }),

        //NEWS
        getNews: build.query({
            query: () => ({
                url: 'news',
                method: 'GET',
            }),
            invalidatesTags: ["apiData"],
        }),
        postNews: build.mutation({
            query: (body) => ({
                url: 'addnews',
                method: 'POST',
                body
            }),
            invalidatesTags: ["apiData"],
            providesTags: retRes
        }),
        patchNews: build.mutation({
            query: (body) => {
                console.log(body)
                return {
                url: 'patchnews',
                method: 'PATCH',
                body
            }},
            invalidatesTags: ["apiData"],
            providesTags: retRes
        }),
        deleteNews: build.mutation({
            query: (body) => ({
                url: 'deletenews',
                method: 'DELETE',
                body
            }),
            invalidatesTags: ["apiData"],
            providesTags: retRes
        }),
    })
})

export const {
    useDeleteNewsMutation,
    usePatchNewsMutation,
    useGetNewsQuery,
    usePostNewsMutation,
    useGetOrdersQuery,
    useSetOrderMutation,
    useGetImageByCategoryNameQuery,
    usePatchBioMutation,
    useGetBioQuery,
    useLoginMutation,
    useLogoutMutation,
    useGetImagesQuery,
    useSetImageMutation,
    useDelImageMutation,
    useChangeImageDescriptionMutation,
    useGetContactsQuery,
    usePatchContactsMutation,
} = workspace;

