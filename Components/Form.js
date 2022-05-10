import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSetRecoilState } from 'recoil';
import { ModalState } from '../atoms/index';
import Modal from './Modal';

export default function Form() {
    const setShowModal = useSetRecoilState(ModalState);
    const { data: session } = useSession();
    return (
        <div className={'w-1/3 flex flex-row justify-around items-center mt-8'}>
            <div className="relative h-8 w-10 m-4">
                <Image src={session?.user.image} layout="fill" alt={session?.user.name} className="rounded-full"/>
            </div>
            <input type="text" className="cursor-pointer w-full h-full m-4 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg
            border border-gray-300 ease-in-out hover:bg-gray-100"
            placeholder={`What's on you mind ${session?.user.name.substring(0,session?.user.name.indexOf(' '))}`}
            onFocus={() => setShowModal(true)} />
            <Modal />
        </div>
    )
}
