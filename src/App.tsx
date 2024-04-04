import { useState } from 'react';
import './App.css';

import { Form } from './components/form/form';
import { FormInput } from './components/form-input/form-input';
import { UserInfo } from './types/user-info';

export const PageWithForm = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: 'example@alea.com',
        age: 30,
        name: 'John Doe',
        phone: {
            ext: '00387',
            number: '65/123-456',
        },
    });

    return (
        <Form initialValues={userInfo} onSubmit={setUserInfo}>
            <FormInput
                type="email"
                required
                name="email"
                placeHolder="your@email.com"
            />
            <FormInput type="number" name="age" min={18} max={99} />
            <FormInput type="text" required name="name" />
            <FormInput type="text" name="phone.ext" />
            <FormInput type="text" name="phone.number" />
            <FormInput type="submit" value="Submit" />
        </Form>
    );
};

const App = () => {
    return <PageWithForm />;
};

export default App;
