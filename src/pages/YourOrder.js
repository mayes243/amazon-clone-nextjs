import moment from "moment"
import Currency from "react-currency-formatter"

const YourOrder = ({ id, amount, amountShipping, items, timestamp, images }) => {
    // console.log( id, amount, amountShipping, items, timestamp, images )
    return (
        <div className="relative border rounded-sm">

            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-gray-600">

                <div className="">

                    <p className="uppercase font-bold text-xs">Order placed</p>
                    <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
                </div>

                <div className="">
                    <p className="uppercase text-xs font-bold">total</p>
                    <p>
                        <Currency quantity={amount} currency='USD' className="capitalize" /> Next Day Delivery <Currency quantity={amountShipping} currency='USD' />
                    </p>

                </div>
                <p className="text-xs whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{items.length} Items</p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER # {id}</p>
            </div>


            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {images.map((image, i) => (
                        <img key={i} src={image} alt="" className="h-20 object-contain sm:h-32" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default YourOrder
