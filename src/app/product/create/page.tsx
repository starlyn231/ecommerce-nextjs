'use client';
import { Button } from "../../components/buttons";

import { useFormState } from "react-dom";
import { addProduct } from "../../lib/actions";
import Link from "next/link";
import Form from "@/app/ui/product/create-form";


const Page = () => {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(addProduct, initialState);
    console.log(state)
    return (
        <div className="mt-5 bg-white rounded-lg shadow mx-auto md:w-2/3">
            <div className="flex"></div>
            <div className="mt-5 bg-white rounded-lg shadow">
                <div className="flex">
                    <div className="flex-1 py-5 pl-5 overflow-hidden">
                        <Form />
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Page;
