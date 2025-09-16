// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import { useRouter, useParams } from "next/navigation";

// // ✅ Validation schema
// const SchemaCheckout = z.object({
//   details: z.string().nonempty("Details are required"),
//   phone: z
//     .string()
//     .nonempty("Phone is required")
//     .regex(/^[0-9]{10,15}$/, "Phone must be valid"),
//   city: z.string().nonempty("City is required"),
// });

// export default function Checkoutsession() {
//   // ✅ Get cartid from URL param
//   const { cartid } = useParams<{ cartid: string }>();

//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const CheckoutForm = useForm<z.infer<typeof SchemaCheckout>>({
//     defaultValues: {
//       details: "",
//       phone: "",
//       city: "",
//     },
//     resolver: zodResolver(SchemaCheckout),
//     mode: "onChange",
//   });

//   // ✅ Handle checkout
//   async function handleCheckout(values: z.infer<typeof SchemaCheckout>) {
//     setLoading(true);
//     try {
//       toast.success("Order placed successfully!", { position: "top-center" });
//       console.log("Checkout Data:", values, "CartId:", cartid);

//       if (cartid) {
//         // ✅ Redirect to confirmation page or payment
//         router.push(`/checkoutsession/${cartid}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="w-3/4 mx-auto my-10">
//       <h1 className="text-3xl font-bold mb-6 text-main">Checkout</h1>
//       <Form {...CheckoutForm}>
//         <form
//           className="space-y-4"
//           onSubmit={CheckoutForm.handleSubmit(handleCheckout)}
//         >
//           {/* Details */}
//           <FormField
//             control={CheckoutForm.control}
//             name="details"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Details:</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     placeholder="Address details..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Phone */}
//           <FormField
//             control={CheckoutForm.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone:</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="tel"
//                     placeholder="Your phone number"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* City */}
//           <FormField
//             control={CheckoutForm.control}
//             name="city"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>City:</FormLabel>
//                 <FormControl>
//                   <Input type="text" placeholder="Your city" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Pay Now Button */}
//           <Button
//             type="submit"
//             className="w-full bg-green-600 text-white hover:bg-green-700 p-4
//               disabled:!bg-white disabled:!border disabled:!border-gray-400
//               disabled:!text-gray-500 disabled:cursor-not-allowed"
//             disabled={!CheckoutForm.formState.isValid || loading}
//           >
//             {loading ? (
//               <>
//                 <i className="fas fa-spinner fa-spin mr-2"></i>
//                 Processing...
//               </>
//             ) : (
//               "Pay Now"
//             )}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }


// "use clinet"

// import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import {useParams} from 'next/navigation'
// import React from 'react'
// import { useForm } from 'react-hook-form';

// export default function Checkoutsession(){

//   const {cartid} = useParams();
//   const shippingForm = useForm({
//     defaultValues:{
//       details: "",
//       phone: "",
//       city: "",
//     }
//   })

//   function checkoutSessionPayment(value){
//   }



//   return (
//     <div className="w-3/4 mx-auto my-5">
//       <h1 className="text-3xl">Checkout Payment</h1>
//       <Form {...shippingForm}>
//         <form className="space-y-4" onSubmit={shippingForm.handleSubmit(handleCheckout)}>
//           <FormField control={shippingForm.control} name='details' render={({field})=>(
//             <FormItem>
//               <FormLabel>
//                 <FormControl>
//                   <Input  {...field} />                 
//                 </FormControl>
//               </FormLabel>
//             </FormItem>
//           </FormField>
//         </form>
//       </Form>
//     </div>
//   )
// }


"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { checkoutPayment } from "@/OrderAction/OrderAction";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

// ✅ Validation schema
const SchemaCheckout = z.object({
  details: z.string().nonempty("Details are required"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .regex(/^[0-9]{10,15}$/, "Phone must be valid"),
  city: z.string().nonempty("City is required"),
});
export default function Checkoutsession() {
  const { cartid } = useParams(); // ✅ URL param (make sure your route is [cartid])

  const shippingForm = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  function checkoutSessionPayment(values: {details: string, phone: string, city: string}) {
    const data = await checkoutPayment(cartId, values);
    console.log("Checkout values:", values, "CartId:", cartid);
    window.open(data.session.url, "_self");
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl font-bold mb-6">Checkout Payment</h1>

      <Form {...shippingForm}>
        <form
          className="space-y-4"
          onSubmit={shippingForm.handleSubmit(checkoutSessionPayment)}
        >
          {/* Details */}
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* phone */}
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* City */}
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your City..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Pay Now</Button>
        </form>
      </Form>
    </div>
  );
}
