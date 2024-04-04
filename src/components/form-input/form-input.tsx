import { useEffect, useState } from 'react';
import { useForm } from '../../context/form-context';
import './form-input.css';

type InputType = 'email' | 'text' | 'number' | 'submit';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    type: InputType;
    name?: string;
    placeHolder?: string;
    value?: string;
};

export const FormInput = ({
    type,
    name,
    value,
    placeHolder,
    ...props
}: Props) => {
    const [inputValue, setInputValue] = useState<string | number>('');
    const [time, setTime] = useState<ReturnType<typeof setTimeout>>();
    const { onChangeHandler, getFormValue } = useForm();
    const initialValue = name ? getFormValue(name) : '';

    useEffect(() => {
        setInputValue(initialValue ?? '');
    }, [initialValue]);

    const handleChange = (value: string) => {
        const formattedInputValue = type === 'number' ? +value : value;
        setInputValue(value);
        clearTimeout(time);
        const timeout = setTimeout(() => {
            onChangeHandler(
                name!,
                !formattedInputValue ? null : formattedInputValue
            );
        }, 500);
        setTime(timeout);
    };

    return (
        <input
            className="form-input"
            type={type}
            name={name}
            placeholder={placeHolder}
            value={type === 'submit' ? value : inputValue}
            onChange={name ? (e) => handleChange(e.target.value) : undefined}
            {...props}
        />
    );
};
