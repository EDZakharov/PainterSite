import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import PATH from '../SERV_PATH'


export const imagesApi = createApi({
    reducerPath: 'api/images',
    tagTypes: ['imagesList'],
    baseQuery: fetchBaseQuery({
        baseUrl: PATH
    }),
    endpoints: (build) => ({
        getImages: build.query({
            query: () => 'images',
            providesTags: (result = [], error, arg) => [
                'imagesList',
                ...result.map(({id}) => ({type: 'imagesList', id}))
            ],
            invalidatesTags: ['imagesList']
        }),
        setImage: build.mutation({
            query: (file) => {
                if (
                    (file && file.type === "image/png") ||
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg"
                ) {
                    const data = new FormData();
                    data.append("image", file);
                    return {
                        url: 'upload',
                        method: 'POST',
                        body: data
                    }
                } else {
                    throw new Error('invalid data type')
                }
            }
        })

    })
})

export const {useGetImagesQuery, useSetImageMutation} = imagesApi