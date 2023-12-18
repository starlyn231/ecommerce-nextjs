'use client';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState, useTransition } from 'react';
import { prisma } from '../lib/db/prisma';
import { existingLike } from '../lib/actions';
import { getLikes } from '../lib/like';

interface AddProductToLikesProps {
    addProductToLikes: (productId: string, userId: string) => void;
    productId: string;
    userId: string;
}

interface ILikeItem {
    id: string;
    productId: string;
    userId: string;
    product: {
        id: string;
        description: string;
        imageUrl: string;
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        likedByCurrentUser: boolean | null;
    };
}
const LikeIcon = ({
    addProductToLikes,
    productId,
    userId,
}: AddProductToLikesProps) => {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    const [liked, setLiked] = useState();
    const [likeOfUser, setLikeOfUser] = useState<ILikeItem[] | null>([]);
    const [filterLike, setLikefilterLike] = useState();

    const handleLike = async () => {
        try {
            setSuccess(false);
            const response: any = await addProductToLikes(userId, productId);
            const likes = await getLikes();
            setLikeOfUser(likes);
            setSuccess(true);
            if (response?.likedByCurrentUser) {
                alert('Like');
            } else {
                alert('Dislike');
            }
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            setSuccess(false);
        }
    };
    const isProductLiked = likeOfUser?.some((like) => like.productId === productId);
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likes = await getLikes();
                setLikeOfUser(likes);
            } catch (error) {
                console.error('Error al obtener los productos que le gustan al usuario:', error);
            }
        };

        fetchLikes();
    }, [userId, productId]);

    return (
        <>
            {isProductLiked ?
                <SolidHeartIcon onClick={handleLike} className="w-8 h-8 mr-3 cursor-pointer hover:bg-red-800 dark:hover:bg-gray-700" color="red" />
                :
                <OutlineHeartIcon className="w-8 h-8 mr-3 cursor-pointer hover:bg-sky-700 focus:text-neutral-700 " onClick={handleLike} />
            }
        </>
    );
};

export default LikeIcon;
