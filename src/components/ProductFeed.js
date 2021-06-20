import Product from "./Product"

const ProductFeed = ({ products }) => {
    return (
        <div>
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">

                {products.slice(0, 4).map(({ id, title, price, description, category, image }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))}
                <img src="/images/ban.jpg" alt="" className="md:col-span-full" />

                <div className="md:col-span-2">
                    {products.slice(4, 5).map(({ id, title, price, description, category, image }) => (
                        <Product
                            key={description}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                        />
                    ))}
                </div>

                {products.slice(4, products.length).map(({ id, title, price, description, category, image }) => (
                    <Product
                        key={title}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductFeed
