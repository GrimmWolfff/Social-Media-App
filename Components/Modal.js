import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { ModalState } from '../atoms/index';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Modal = () => {
    const { data: session } = useSession();
    const [Post, setPost] = useState('');
    const router = useRouter();
    const [showModal, setShowModal] = useRecoilState(ModalState);
    const uploadPost = async () => {
        const response = await fetch('/api/posts', { 
            method: 'POST',
            body: JSON.stringify({
                post: Post,
                author: session.user.name,
                userImg: session.user.image,
                createdAt: new Date().toString()
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // const resData = await response.json();
    }
    return (
        <form className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed z-50">
            {showModal ? (
            <div className="relative my-6 p-6 mx-auto max-w-3xl border-0 rounded-lg
            shadow-lg relative flex flex-col ease-in-out duration-300 text-white bg-slate-900 hover:bg-slate-800 outline-none 
            focus:outline-none h-[60vh] w-[40vw] mt-[85%] border border-[1px] border-black">
                <p className="cursor-pointer text-bold text-red-500 p-2 m-2 rounded-lg absolute right-0 top-0
                ease-in-out duration-500 hover:bg-red-500 hover:text-white" 
                onClick={() => setShowModal(false)}>Discard</p>
                <h1 className="text-xl text-center border-b-[1px] text-white border-black">Create a Post</h1>
                <textarea
                    rows="4"
                    placeholder="What do you want to talk about?"
                    className="p-4 text-white bg-transparent focus:outline-none dark:placeholder-white/75 resize-none"
                    onChange={(e) => setPost(e.target.value)}
                    onFocus={() => setShowModal(true)}
                    required
                />
                <button
                    className="p-4 m-4 absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 
                    disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
                    type="submit"
                    onClick={() => {
                        uploadPost();
                        alert('Your post will be uploaded in a couple of seconds');
                        router.reload();
                    }}>
                    Post
                </button>
            </div>
            ) : null}
        </form>        
    )
}
export default Modal;