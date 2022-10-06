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
            query: (dto) => {
                console.log(dto)
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
                        body: data
                    }
                } else {
                    throw new Error('invalid data type')
                }
            },
            providesTags: (result = [], error, arg) => [
                'imagesList',
                ...result.map(({id}) => ({type: 'imagesList', id}))
            ],
            invalidatesTags: ['imagesList']
        }),
        delImage: build.mutation({
            query: (name) => {
                return {
                    url: 'delete',
                    method: 'DELETE',
                    body: {name: name}
                }
            },
            providesTags: (result = [], error, arg) => [
                    'imagesList',
                    ...result.map(({id}) => ({type: 'imagesList', id}))
                ],
            invalidatesTags: ['imagesList']
        }),
        changeImageDescription: build.mutation({
            query: (data) => {
                return {
                    url: 'patch',
                    method: 'PATCH',
                    body: {name:data.name, description:data.description}
                }
            },
            providesTags: (result = [], error, arg) => [
                'imagesList',
                ...result.map(({id}) => ({type: 'imagesList', id}))
            ],
            invalidatesTags: ['imagesList']
        })

    })
})

export const {useGetImagesQuery, useSetImageMutation, useDelImageMutation, useChangeImageDescriptionMutation} = imagesApi