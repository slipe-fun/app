import { PageModal } from "../../modals";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Header from "./header";
import EmailAlert from "./email-alert";
import settings from "@/constants/settings";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function SettingsModal({ user, open, setOpen }) {
	const settingsModalRef = useRef(null);
	const { scrollY } = useScroll({ container: open ? settingsModalRef : null, offset: ["40%", "-0%"] });

	return (
		<PageModal className='flex flex-col overflow-hidden bg-background' open={open}>
			<Header setOpen={setOpen} scrollProgress={scrollY} user={user} />
			<div ref={settingsModalRef} className='overflow-y-auto flex flex-col pt-[16.75rem] gap-5 p-5 w-full h-full'>
				{!user?.email ? <EmailAlert /> : null}
				{settings.map(category => (
					<div className='flex flex-col gap-3'>
						{category.label === "Slipe comet" ? (
							<span className='text-[1.75rem] leading-[2.125rem] font-semibold bg-gradient-to-r from-[#FFA953] to-[#FF823F] text-transparent bg-clip-text'>
								{category.label}
							</span>
						) : (
							<span className='text-[1.75rem] leading-[2.125rem] font-medium'>{category.label}</span>
						)}

						<div className='w-full bg-foreground/[0.12] rounded-3xl flex flex-col'>
							{category.actions.map(action => (
								<div className='w-full flex p-3 items-center gap-3'>
									<div
										style={{
											"--background": `hsl(${action.color} / 0.35)`,
											"--icon": `hsl(${action.color === "var(--gray)" ? "0 0% 100%" : action.color})`,
										}}
										className='w-12 h-12 rounded-xl flex justify-center items-center bg-[--background] text-[--icon]'
									>
										<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons[action.icon]} />
									</div>
									<span className='font-medium'>{action.label}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</PageModal>
	);
}
