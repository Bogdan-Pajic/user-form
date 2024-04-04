import { createContext, useState, useContext, ReactNode } from 'react';
import { UserInfo } from '../types/user-info';
import {
    getFormFieldValue,
    getNestedValues,
} from '../helpers/transformFormValues';

type Props = {
    children: ReactNode;
};

type FormContextType = {
    formValues: UserInfo;
    setFormValues: (values: UserInfo) => void;
    onChangeHandler: (key: string, value: string | number | null) => void;
    getFormValue: (name: string) => string;
};
const FormContext = createContext<FormContextType>({
    formValues: {
        email: '',
        age: null,
        name: '',
        phone: {
            ext: null,
            number: null,
        },
    },
    setFormValues: () => {},
    onChangeHandler: () => {},
    getFormValue: () => '',
});

export const FormProvider = ({ children }: Props) => {
    const [formValues, setFormValues] = useState<UserInfo>({
        email: '',
        age: 0,
        name: '',
        phone: {
            ext: '',
            number: '',
        },
    });

    const onChangeHandler = (key: string, value: string | number | null) => {
        const nestedValues = getNestedValues(key, value, formValues);
        setFormValues((prevValue) => ({
            ...prevValue,
            ...nestedValues,
        }));
    };

    const getFormValue = (name: string) => {
        return getFormFieldValue(name, formValues);
    };

    return (
        <FormContext.Provider
            value={{ formValues, setFormValues, onChangeHandler, getFormValue }}
        >
            {children}
        </FormContext.Provider>
    );
};

export const useForm = () => useContext(FormContext);
