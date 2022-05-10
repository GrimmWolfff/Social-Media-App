import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession, getSession } from 'next-auth/react';
import { BsHeart as LikeIcon } from 'react-icons/bs';
import { BiComment as CommentIcon, BiArrowBack as BackIcon } from 'react-icons/bi';
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md';
import { FiEdit2 as EditIcon } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Navbar from '../../Components/Navbar';


export default function PostDetails({ post }) {
    const router = useRouter();
    const { data: session } = useSession();

    const formatTime = () => {
        let diff = Date.now() - new Date(post.createdAt).getTime();
        let msec = diff;
        let hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        let mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        return hh ? `${hh}h` : `${mm}min` 
    }
    const deletePost = async () => {
        const response = await fetch(`/api/posts/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        alert('Post has been deleted');
        router.push('/');
    }
    const LikePost = async () => {
        // if(post.likes.includes(session.user)) return;

        const response = await fetch(`/api/posts/${post._id}`, {
            method: 'LIKE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response);
    }
    return (
        <div>
            <Navbar />
            <BackIcon className="text-6xl icon p-4" onClick={() => router.push(`/`)}/>
            <div className="flexbox mt-[10%] w-full">
                <div className="flex items-start w-1/2 px-4 py-6 relative rounded-lg bg-white m-4 h-auto shadow-lg">
                    <div className="relative w-[45px] h-[40px] mr-4">
                        <Image className="rounded-full shadow"
                        src={post.userImg} layout="fill" alt="avatar"/>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[1.5vw] font-semibold text-gray-900 -mt-1 cursor-pointer"
                            onClick={() => router.push(`/profile/${post._id}`)}>{post.author}</h2>
                            <small className="text-sm text-gray-700">{formatTime()}</small>
                        </div>
                        <p className="text-gray-700 text-[1vw]">{post.createdAt.substring(0, post.createdAt.indexOf("GMT"))}</p>
                        <p className="mt-3 text-gray-700 text-[1vw]"> {post.post}</p>
                        <div className="w-36 mt-4 flex flex-row justify-between items-center">
                            <LikeIcon className={`icon`} onClick={() => LikePost()}  />
                            <CommentIcon className="icon" />
                            {session?.user.image === post.userImg ? (
                                <>
                                    <DeleteIcon onClick={() => deletePost()} className="icon"/>
                                    <EditIcon onClick={() => router.push(`/edit/${post._id}`)} className="icon"/>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await fetch(`http://localhost:3000/api/posts/${context.params.id}`, { 
        method: 'GET',
        headers: { 'Content-Type' : 'application/json' }
    });
    const post = await response.json();

    return { props: { post } }
}