export const getNestedValues = (
    key: string,
    value: string | number | null,
    initialValue: Record<string, unknown>
) => {
    const keys = key.split('.');

    if (keys.length === 1) return { [key]: value };

    return keys.reduceRight((acc, currentValue, index) => {
        if (index === keys.length - 1) {
            return {
                ...(initialValue[
                    keys[keys.length - (index + 1)] as keyof typeof initialValue
                ] as Record<string, unknown>),
                [currentValue]: value,
            };
        }
        return { [currentValue]: { ...acc } };
    }, {});
};

export const getFormFieldValue = (
    name: string,
    initialValue: Record<string, unknown>
) => {
    const items = name.split('.');
    return items.reduce((acc: any, key) => {
        if (acc && typeof acc === 'object') {
            return acc[key];
        }
        return acc;
    }, initialValue);
};
