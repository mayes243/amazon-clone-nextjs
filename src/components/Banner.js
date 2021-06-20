import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

const Banner = () => {
    return (
        <div className="relative">

            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />

            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                // by default 3 second
                interval={5000}
            >
                <div>
                    <img loading='lazy' src="/images/banner g1.jpg" alt="" />
                </div>

                <div>
                    <img loading='lazy' src="/images/6ff.jpg" alt="" />
                </div>

                <div>
                    <img loading='lazy' src="/images/7ma.jpg" alt="" />
                </div>

            </Carousel>
        </div>
    )
}

export default Banner
