import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '../../Components/Navbar';
import { BiArrowBack as BackIcon } from 'react-icons/bi';

export default function Profile() {
    const router = useRouter();
    const { data: session } = useSession();
    // React.useEffect(() => {
    //     if(!session) router.push('/home');
    //     const fetchPost = async () => {
    //         const response = await fetch('/api/posts', { 
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const resData = await response.json();
    //         console.log(resData)
    //     }
    //     fetchPost();
    // }, [])
    return (
        <div className="h-screen w-full shadow-lg rounded-2xl bg-white dark:bg-gray-800 flexbox">
            <Navbar />
            <BackIcon className="text-6xl icon p-4" onClick={() => router.push(`/`)}/>
            <div className="h-1/2 w-1/4 flex flex-col items-center justify-center p-4">
                <div className="h-16 w-16 mb-4 relative">
                    <Image src={session?.user?.image} layout="fill" alt="profile" className="rounded-t-lg "/>    
                </div>
                <p className="text-gray-800 dark:text-white text-xl font-medium mt-2">
                    {session?.user.name}
                </p>
                <p className="text-xs p-2 bg-blue-500 text-white px-4 rounded-full">
                    {session?.user.email}
                </p>
                <div className="rounded-lg p-2 w-full mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
                        <p className="flex flex-col">
                            Articles
                            <span className="text-black dark:text-white font-bold">
                                34
                            </span>
                        </p>
                        <p className="flex flex-col">
                            Followers
                            <span className="text-black dark:text-white font-bold">
                                455
                            </span>
                        </p>
                        <p className="flex flex-col">
                            Rating
                            <span className="text-black dark:text-white font-bold">
                                9.3
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


// export async function getServerSideProps(context) {
//     const id = context.params.id;
//     const { db } = await connectToDatabase();
//     const user = await db.collection('users').findOne({ id });

//     return { props: { user } }
// }