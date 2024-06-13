'use cliente'
import { useFormState } from "react-dom";
import Link from "next/link";
import { addProduct } from "@/app/lib/actions";
import { Button } from "@/app/components/buttons";
import FormSubmitButton from "@/app/components/FormSubmitButton";
interface ICategory {
    id: number;
    label: string;
}

const categoryMockup: ICategory[] = [
    { id: 1, label: 'Men' },
    { id: 2, label: 'Women' },
    { id: 3, label: 'Deal' },
    { id: 4, label: 'Child' },

];
const Form = () => {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(addProduct, initialState);
    return (
        <>
            <h1 className="mb-3 text-lg font-bold">Add Product</h1>
            <form action={dispatch}>
                <div className="rounded-md  p-4 md:p-6">


                    <input
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="input-bordered input mb-3 w-full"
                        aria-describedby="name-error"
                    />
                    {state.errors?.name ? (
                        <div
                            id="name-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.name.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        className="textarea-bordered textarea mb-3 w-full"
                        aria-describedby="description-error"
                    />
                    {state.errors?.description ? (
                        <div
                            id="description-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.description.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                    <div className="flex items-center mt-2">
                        <select
                            id="category"
                            name="category"
                            placeholder="Select Category"
                            className="input-bordered input mb-3 w-full"

                            aria-describedby="category-error"
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            {categoryMockup.map((category) => (
                                <option key={category.id} value={category.label}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {state.errors?.category ? (
                        <div
                            id="category-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.category.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                    <input

                        name="imageUrl"
                        placeholder="Image URL"
                        type="url"
                        className="input-bordered input mb-3 w-full"
                        aria-describedby="imageUrl-error"
                    />
                    {state.errors?.imageUrl ? (
                        <div
                            id="imageUrl-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.imageUrl.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                    <input

                        name="price"
                        placeholder="Price"
                        type="number"
                        className="input-bordered input mb-3 w-full"
                        aria-describedby="price-error"
                    />
                    {state.errors?.price ? (
                        <div
                            id="price-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.price.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}

                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/home"
                        className="flex h-10 items-center rounded-md bg-red-500 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancel
                    </Link>
                    <FormSubmitButton className="btn-block bg-light-green-600 p-1 rounded-md "  >Add Product</FormSubmitButton >
                </div>
            </form>

        </>
    )
}

export default Form;
