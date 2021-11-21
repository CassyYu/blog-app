import { Space } from "@arco-design/web-react"
import { IconUndo, IconRedo, IconH1, IconH2, IconH3, IconHighlight, IconBold, IconItalic, IconQuote, IconUnderline, IconStrikethrough } from '@arco-design/web-react/icon';

export default function Toolbar() {
	return (
		<div id='toolbar' className='mt-6 flex justify-between border-b text-xl text-gray-600 overflow-scroll'>
			<Space size='large'>
				<Space size='medium'>
					<IconUndo />
					<IconRedo />
				</Space>
				<Space size='medium'>
					<IconH1 />
					<IconH2 />
					<IconH3 />
					<IconBold />
					<IconItalic />
					<IconUnderline />
					<IconStrikethrough />
					<IconHighlight />
				</Space>
				<Space size='medium'>
					<IconQuote />
				</Space>
			</Space>
		</div>
	)
}