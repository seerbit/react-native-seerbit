import { StyleSheet, View, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'

interface Props {
    placeholder: string,
    value: string,
    onChangeText: any,
    style?: object,
    rootStyle?: object,
    isForPassword?: boolean,
    keyboardType?: 'default' | 'numeric',
    editable?: boolean,
    placeholderStyle?: string,
    onEnterPressed?: any,
    returnKeyType?: 'next' | 'done',
    disabled?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    toFocus?: boolean
}
const CustomInput: React.FC<Props> = ({
    placeholder,
    placeholderStyle,
    value,
    onChangeText = () => { },
    style,
    rootStyle,
    editable = true,
    keyboardType = 'default',
    onEnterPressed = () => { },
    returnKeyType = 'next',
    onBlur = () => { },
    onFocus = () => { },
}) => {
    const [focus, setFocus] = useState<boolean>(false)
    const inputRef = useRef<any>(null)


    return (
        <View
            style={[focus ? styles.root1 : styles.root2, rootStyle]}
        >
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, style]}
                onFocus={() => {
                    setFocus(true)
                    onFocus()
                }}
                onBlur={() => {
                    setFocus(false)
                    onBlur()
                }}
                editable={editable}
                placeholderTextColor={placeholderStyle ? placeholderStyle : 'gray'}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onEnterPressed}
                ref={inputRef}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    input: {
        width: '80%',
        color: '#1E2234',
    },
    root1: {
        width: '90%',
        height: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1.2,
        borderColor: '#F24736',
        flexDirection: 'row',
        alignItems: 'center'
    },
    root2: {
        width: '90%',
        height: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    }
})