'use client';
import { useFormState } from "react-dom";
import Link from "next/link";
import Form from "@/app/ui/product/create-form";
import { addProduct } from "@/app/lib/actions";



const Page = () => {

    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(addProduct, initialState);

    return (
        <div className="mt-5 bg-gray-50 rounded-lg shadow mx-auto md:w-2/3">
            <div className="flex"></div>
            <div className="mt-5 bg-gray rounded-lg shadow">.
                <div className="flex">
                    <div className="flex-1 p-5 pl-5 overflow-hidden">
                        <Form />
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Page;
