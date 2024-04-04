import { useEffect } from 'react';
import { UserInfo } from '../../types/user-info';
import { useForm } from '../../context/form-context';
import './form.css';

type Props = {
    initialValues: UserInfo;
    children: React.ReactNode;
    onSubmit: (value: UserInfo) => void;
};

export const Form = ({ initialValues, children, onSubmit }: Props) => {
    const { formValues, setFormValues } = useForm();

    useEffect(() => {
        setFormValues(initialValues);
    }, []);

    const submitFormValues = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('User successfully created!');
        onSubmit(formValues);
    };

    return (
        <form className="form" onSubmit={submitFormValues}>
            <h1 className="form-title">User form</h1>
            {children}
        </form>
    );
};
