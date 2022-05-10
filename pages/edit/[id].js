import React, { useState } from 'react';
import Image from 'next/image';
import { MdDeleteOutline as DeleteIcon } from 'react-icons/md';
import Navbar from '../../Components/Navbar';
import { BiArrowBack as BackIcon } from 'react-icons/bi';
import { useRouter } from 'next/router';

export default function EditPost({ post }) {
    const router = useRouter();
    const [NewPost, setNewPost] = useState('');
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
    const updatePost = async () => {
        const response = await fetch(`/api/posts/${post._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post:NewPost
            }),
            headers: { 'Content-Type' : 'application/json' }
        });
    }
    return (
        <div>
            <Navbar />
            <BackIcon className="text-6xl icon p-4" />
            <div className="flexbox mt-[10%] w-full" >
                <div className="flex items-start w-1/2 px-4 py-6 relative rounded-lg bg-white m-4 h-auto shadow-lg">
                    <div className="relative w-[45px] h-[40px] mr-4">
                        <Image className="rounded-full shadow"
                        src={post.userImg} layout="fill" alt="avatar"/>
                    </div>
                        <div className="w-full flex flex-col">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[1.5vw] font-semibold text-gray-900 -mt-1 cursor-pointer"
                                onClick={() => router.push(`/profile/${id}`)}>{post.author}</h2>
                            </div>
                            <textarea className="border border-black w-full rounded-lg p-2 mb-2 
                            mt-3 text-gray-700 text-[1vw] resize-none" defaultValue={post.post}
                            onChange={e => setNewPost(e.target.value)}></textarea>
                            <div className="flex justify-between mt-0">
                                <button className="button" onClick={() => {updatePost();router.push(`/post/${post._id}`)}}>Finish</button>
                                <DeleteIcon onClick={() => deletePost()} className="icon text-3xl"/>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = await context.params.id;
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json' }
    });
    const post = await response.json();

    return { props: { post } }
}