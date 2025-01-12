export default function NameColor({ user }) {
	return (
		<div className='w-full flex flex-col px-5 gap-3'>
			<div className='flex items-center'>
				<span className='text-2xl font-medium w-full'>Name color</span>
				<span className='text-lg min-w-fit text-primary'>Blue</span>
			</div>
		</div>
	);
}
