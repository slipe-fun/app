import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import cdn from "@/constants/cdn";
import PixelAvatar from "@/components/shared/pixels-avatar";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/effect-creative";

export default function Avatar({ user }) {
	const [rawImage, setRawImage] = useState("");
	const [avatar, setAvatar] = useState("");

	useEffect(() => {
		if (rawImage) {
			const reader = new FileReader();
			reader.onload = fileReaderEvent => {
				setAvatar(fileReaderEvent.target.result);
			};
			reader.readAsDataURL(rawImage);
		}
	}, [rawImage]);

	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='flex items-center px-5'>
				<span className='text-2xl font-medium w-full'>Avatar</span>
				<span className='text-lg min-w-fit text-foreground/50'>Max 3mb</span>
			</div>
			<Swiper
				initialSlide={1}
				creativeEffect={{
					limitProgress: 2,
					prev: {
						opacity: 0.4,
						translate: ["-118%", 0, 0],
					},
					next: {
						opacity: 0.4,
						translate: ["118%", 0, 0],
					},
				}}
				effect='creative'
				slidesPerView='auto'
				centeredSlides
				modules={[EffectCreative]}
				className='w-full'
			>
				<SwiperSlide className='w-40 !h-40'>
					<div className='bg-foreground/[0.12] relative rounded-full w-40 h-40 flex justify-center items-center'>
						<Svg icon={icons["image"]} className='!w-[4.75rem] !h-[4.75rem]' />
						<input
							onChange={e => {
								if (e.target.files && e.target.files.length > 0) {
									setRawImage(e.target.files[0]);
								}
							}}
							type='file'
							className='w-full h-full absolute z-10 opacity-0'
						/>
					</div>
				</SwiperSlide>
				{user?.avatar ? (
					<SwiperSlide className='w-40 !h-40'>
						<img src={`${cdn}/avatars/${user?.avatar}`} className='h-full w-full rounded-full' />
					</SwiperSlide>
				) : null}

				<SwiperSlide className='w-40 !h-40'>
					<PixelAvatar size={160} username={user?.username} pixels={user?.pixel_order} />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
