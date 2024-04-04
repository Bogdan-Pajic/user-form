export type UserInfo = {
    email: string;
    age: number | null;
    name?: string;
    phone?: UserPhone;
};

type UserPhone = {
    ext: string | null;
    number: string | null;
};
