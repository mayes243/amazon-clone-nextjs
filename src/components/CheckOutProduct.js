import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import Currency from 'react-currency-formatter'
import { useDispatch } from "react-redux"
import { addToBasket, removeFromBasket } from "../slices/basketSlice"

const CheckOutProduct = ({ id, title, price, description, category, image, rating, hasPrime }) => {

    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = { id, title, price, description, category, image, rating, hasPrime }
        // push item into bucket
        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        // remove item from bucket
        dispatch(removeFromBasket({ id }))
    }

    return (
        <div className="grid grid-cols-5">
            <Image src={image} height={200} width={200} objectFit="contain" />
            {/* middle section */}

            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (

                        <StarIcon key={i} className="h-5 text-yellow-500 cursor-pointer" />

                    ))}
                </div>
                <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency='USD' />
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img loading="lazy" className="w-12" src="images/primelogo.png" alt="" />
                        <p className="text-xs text-gray-500">FREE next-dat delivery</p>
                    </div>
                )}

            </div>
            {/* right add and remove button */}
            <div className="flex flex-col space-y-2 my-auto justift-self-end">
                <button className="button capitalize" onClick={addItemToBasket}>Add to bucket</button>

                <button className="button capitalize" onClick={removeItemFromBasket}>remove from bucket</button>

            </div>


        </div>
    )
}

export default CheckOutProduct
