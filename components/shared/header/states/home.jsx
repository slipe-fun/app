import { PagesContentTypeContext } from "@/hooks/contexts/posts-type";
import { useEffect, useContext } from "react";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function StateHome({ url }) {
	const { activeContent, setActiveContent } = useContext(PagesContentTypeContext);

	const changeTab = value => {
		const updatedTab = [...activeContent];
		updatedTab[0] = value;
		setActiveContent(updatedTab);
	};

	useEffect(() => {
		changeTab("forYou");
	}, [url]);

	return (
		<>
			<Button
				data-isactive={url == "/notifs"}
				size='icon'
				className='rounded-full w-14 h-14 min-w-14 min-h-14 data-[isactive=false]:bg-foreground/[0.12] data-[isactive=true]:bg-foreground data-[isactive=false]:text-foreground data-[isactive=true]:text-background'
			>
				<Link to='/notifs'>
					<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons["bell"]} />
				</Link>
			</Button>
			<div className='rounded-full p-1 relative flex h-14 w-full bg-foreground/[0.12]'>
				<div
					data-isactive={activeContent[0] == "follows"}
					className='absolute data-[isactive=true]:translate-x-full data-[isactive=false]:translate-x-0 duration-200 ease-out w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] rounded-full bg-foreground/[0.12]'
				/>
				<Button
					data-isactive={activeContent[0] == "forYou"}
					onClick={() => changeTab("forYou")}
					size='full'
					variant='transparent'
					className='h-full bg-transparent data-[isactive=true]:opacity-100 data-[isactive=false]:opacity-50 rounded-full min-h-full'
				>
					Blogs
				</Button>
				<Button
					data-isactive={activeContent[0] == "follows"}
					onClick={() => changeTab("follows")}
					size='full'
					variant='transparent'
					className='h-full bg-transparent data-[isactive=true]:opacity-100 data-[isactive=false]:opacity-50 rounded-full min-h-full'
				>
					Follows
				</Button>
			</div>
			<Button
				data-isactive={url == "/search"}
				size='icon'
				className='rounded-full w-14 h-14 min-w-14 min-h-14 data-[isactive=false]:bg-foreground/[0.12] data-[isactive=true]:bg-foreground data-[isactive=false]:text-foreground data-[isactive=true]:text-background'
			>
				<Link to='/search'>
					<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons["search"]} />
				</Link>
			</Button>
		</>
	);
}
