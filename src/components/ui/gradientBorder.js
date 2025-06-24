import { Canvas, RoundedRect, LinearGradient as SkiaLinearGradient, vec } from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";
import { forwardRef, useState, useCallback } from "react";
import { View } from "tamagui";

export const GradientBorder = forwardRef(
	(
		{
			children,
			style,
			borderWidth = 1,
			borderRadius = 10,
			gradientColors = ["rgba(255, 255, 255, 0.20)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.20)"],
			gradientStart = { x: 0, y: 0 },
			gradientEnd = { x: 1, y: 1 },
			...props
		},
		ref
	) => {
		const [layout, setLayout] = useState({ width: 0, height: 0 });

		const onLayout = 
			useCallback(e => {
				const { width, height } = e.nativeEvent.layout;
				setLayout({ width, height });
			}, []);

		const startVec = vec(gradientStart.x * layout.width, gradientStart.y * layout.height);
		const endVec = vec(gradientEnd.x * layout.width, gradientEnd.y * layout.height);
		return (
			<View
				ref={ref}
        {...props}
				onLayout={onLayout}
				style={[
					{
						position: "relative",
					},
					style,
				]}
			>
				{layout.width > 0 && layout.height > 0 && (
					<Canvas style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
						<RoundedRect
							x={borderWidth / 2}
							y={borderWidth / 2}
							width={layout.width - borderWidth}
							height={layout.height - borderWidth}
							r={borderRadius}
							style='stroke'
							strokeWidth={borderWidth}
						>
							<SkiaLinearGradient start={startVec} end={endVec} colors={gradientColors} />
						</RoundedRect>
					</Canvas>
				)}
				{children}
			</View>
		);
	}
);
