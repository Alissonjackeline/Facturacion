import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	className?: string;
	style?: React.CSSProperties;
}

const MotionContainer = ({ children, className, style }: Props) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.5,
				ease: "easeOut"
			}}
			style={style}
			className={className}
		>
			{children}
		</motion.div>
	);
};

export default MotionContainer;
