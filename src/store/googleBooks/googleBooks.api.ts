import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IItem, ServerResponse } from "../../models/models"

export const googleBooksApi = createApi({
    reducerPath: "googleBooks/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.googleapis.com"
    }),
    endpoints: build => ({
        searchBooks: build.query<ServerResponse<IItem>, Array<string | number>>({
            query: (arr) => ({
                url: `/books/v1/volumes`,
                params: {
                    q: arr[0],
                    orderBy: arr[1],
                    startIndex: arr[2],
                    maxResults: arr[3],
                    key: "AIzaSyDQ1tQk2-QIy_dJUiIxTfhFMGtiLhVv-K8",
                }
            })
        })
    })
})

export const { useLazySearchBooksQuery } = googleBooksApi

