import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllOrdersResponse, MessageResponse, OrderDetailsResponse, UpdateOrderRequest ,} from "../../types/api-types";
import { OrderItem } from "../../types/types";


export const  orderApi=createApi({
    reducerPath:"orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
      }),
      tagTypes:["orders"],
      endpoints:(builder)=>({
        newOrder:builder.mutation<MessageResponse,OrderItem>({
            query:(order)=>({url:"new",method:"POST",body:order}),
           // invalidatesTags=["orders"],
        }),
        updateOrder:builder.mutation<MessageResponse,UpdateOrderRequest>({
            query:({userId,orderId})=>({
                url:`${orderId}?id=${userId}`,
                method:"PUT",
            })
        }),
        deleteOrder:builder.mutation<MessageResponse,UpdateOrderRequest>({
            query:({userId,orderId})=>({
                url:`${orderId}?id=${userId}`,
                method:"DELETE",
            })
        }),
        myOrders:builder.query<AllOrdersResponse,string>({
            query:(id)=>`my?id=${id}`
        }),
        allOrders:builder.query<AllOrdersResponse,string>({
            query:(id)=>`all?id=${id}`
        }),
        orderDetails:builder.query<OrderDetailsResponse,string>({
            query:(id)=>id
        }),
      })
});

export const {
    useNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useMyOrdersQuery,
    useAllOrdersQuery,
    useOrderDetailsQuery,
  } = orderApi;
