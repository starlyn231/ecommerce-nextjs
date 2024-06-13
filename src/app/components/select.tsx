"use client"
import { useState } from "react";


const CustomerSelect = ({ onChange, data, defaultOption }: any) => {
    const [value, setValue] = useState('');

    const handleChange = (value: any) => {
        setValue(value);

        if (onChange) {
            onChange(value);
        }
    };
    console.log(value)
    return (
        <select
            id="customer"
            name="customerId"
            className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2  placeholder:text-gray-500"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            aria-describedby="customer-error"
        >
            <option value="" disabled>
                {defaultOption}
            </option>
            {data.map((size: any) => (
                <option key={size.id} value={size.label}>
                    {size.label}
                </option>
            ))}
        </select>
    )
}

export default CustomerSelect 
