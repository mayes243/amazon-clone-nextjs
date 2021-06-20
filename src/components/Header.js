import Image from 'next/image'
import { useRouter } from 'next/router'
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

const Header = () => {
    const [session] = useSession();

    const router = useRouter();

    const items = useSelector(selectItems)

    // session.user.
    return (
        <header className="capitalize">
            {/* to navbar */}

            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">

                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">

                    <Image
                        onClick={() => router.push('/')}
                        src='/images/amazon_PNG11.png'
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                    />

                </div>

                {/* search */}
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">

                    <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" />
                    <SearchIcon className="h-12 p-4" />

                </div>

                {/* right */}
                <div className="text-white flex items-center text-xs space-x-6 whitespace-nowrap pl-3">
                    <div onClick={!session ? signIn : signOut} className="link">
                        <p>
                            {/* sign in */}
                            {session ? `Hello, ${session.user.name}` : 'Sign In'}
                        </p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>

                    <div className="link" onClick={()=>session && router.push('/orders')}>
                        <p>returns</p>
                        <p className="font-extrabold md:text-sm">& order</p>
                    </div>

                    <div className="relative link flex items-center" onClick={() => router.push('/checkout')}>

                        <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center text-black rounded-full font-bold">
                            {items.length}
                        </span>

                        <ShoppingCartIcon className="h-10" />

                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">basket</p>
                    </div>


                </div>
            </div>


            {/* bottom navbar */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm relative">

                <p className="link flex items-center">

                    <MenuIcon className="h-6 mr-1" /> all

                    </p>

                <p className="link">prime video</p>
                <p className="link">amazon business</p>
                <p className="link">today's deal</p>

                <p className="hidden link lg:inline-flex">electronics</p>
                <p className="hidden link lg:inline-flex">food & grocery</p>
                <p className="hidden link lg:inline-flex">prime</p>
                <p className="hidden link lg:inline-flex">buy again</p>
                <p className="hidden link lg:inline-flex">shopper toolkit</p>
                <p className="hidden link lg:inline-flex">health & personal care</p>
                <p className="hidden link xl:inline-flex text-xl right-0 absolute">Amazon's response to COVID-19</p>
            </div>
        </header>
    )
}

export default Header
