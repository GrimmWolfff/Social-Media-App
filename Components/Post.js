import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsHeart as LikeIcon, BsThreeDots as ViewMoreIcon } from 'react-icons/bs';
import { BiComment as CommentIcon } from 'react-icons/bi';
import Link from 'next/link';

export default function Post({ id, avatar, author, post, createdAt }) {
    const router = useRouter();
    const formatTime = () => {
        let diff = Date.now() - new Date(createdAt).getTime();
        let msec = diff;
        let hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        let mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        return hh ? `${hh}h` : `${mm}min` 
    }
    return (
        <div className="flex bg-white shadow-lg rounded-lg w-1/2 m-4">
            <div className="flex items-start w-full px-4 py-6 relative">
                <div className="relative w-[45px] h-[40px] mr-4">
                    <Image className="rounded-full shadow"
                    src={avatar} layout="fill" alt="avatar"/>
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1 cursor-pointer"
                        onClick={() => router.push(`/profile/${id}`)}>{author}</h2>
                        <small className="text-sm text-gray-700">{formatTime()}</small>
                    </div>
                    <p className="text-gray-700">{createdAt.substring(0, createdAt.indexOf("GMT"))}</p>
                    <p className="mt-3 text-gray-700 text-sm"> {post}</p>
                    <div className="w-full mt-4 flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-left items-start w-5/6">
                            <LikeIcon className="icon" />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <CommentIcon className="icon" />
                        </div>
                        <div className="w-1/6 flex justify-end items-right">
                            <Link href={`/post/${encodeURIComponent(id)}`}>
                                <a>
                                    <ViewMoreIcon className="icon" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
