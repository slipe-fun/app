const ColorfullyView = ({children, ...props}) => {
    return (
        <View {...props}>
            {children}
        </View>
    )
}

export default ColorfullyView