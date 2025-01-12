import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function EmailAlert({ setActiveModal }) {
	return (
		<div
			onClick={() => setActiveModal("confirm")}
			className='w-full rounded-3xl cursor-pointer bg-primary/35 flex gap-[0.875rem] text-primary p-[0.875rem]'
		>
			<img src='./static/states-assets/email.png' className='w-11 h-11' />
			<div className='w-full flex flex-col'>
				<span className='font-semibold'>Confirm email</span>
				<span className='font-medium opacity-75 text-sm'>You need to confirm email to full functional</span>
			</div>
			<div className='min-w-10 h-10 flex justify-center items-center'>
				<Svg className='!w-6 !h-6 rotate-180 opacity-50' icon={icons["chevronLeft"]} />
			</div>
		</div>
	);
}
