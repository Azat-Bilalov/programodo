const Joi = require('joi');

const ruMessages = {
    base: 'Значение {#label} недопустимо',
    any: {
        unknown: 'Значение {#label} не разрешено',
        invalid: 'Значение {#label} содержит недопустимое значение',
        valid: 'Значение {#label} не соответствует ни одному из разрешенных значений',
        empty: 'Значение {#label} не может быть пустым',
        required: 'Поле {#label} обязательно для заполнения',
        only: 'Значение {#label} должно быть одним из {#valids}',
        allowOnly: 'Значение {#label} должно быть одним из {#valids}',
        default: 'Значение {#label} вызвало ошибку при выполнении метода default',
    },
    string: {
        base: 'Значение {#label} должно быть строкой',
        min: 'Значение {#label} должно быть не менее {#limit} символов',
        max: 'Значение {#label} должно быть не более {#limit} символов',
        length: 'Значение {#label} должно быть длиной {#limit} символов',
        alphanum: 'Значение {#label} должно содержать только буквы и цифры',
        token: 'Значение {#label} должно содержать только буквы, цифры и символы подчеркивания',
        email: 'Значение {#label} должно быть валидным email-адресом',
        uri: 'Значение {#label} должно быть валидным uri',
        uriRelativeOnly: 'Значение {#label} должно быть валидным относительным uri',
        pattern: {
            base: 'Значение {#label} должно соответствовать шаблону {#regex}',
            name: 'Значение {#label} должно соответствовать шаблону {#name}',
        },
    },
    number: {
        base: 'Значение {#label} должно быть числом',
        min: 'Значение {#label} должно быть не менее {#limit}',
        max: 'Значение {#label} должно быть не более {#limit}',
        less: 'Значение {#label} должно быть меньше {#limit}',
        greater: 'Значение {#label} должно быть больше {#limit}',
        float: 'Значение {#label} должно быть дробным числом',
        integer: 'Значение {#label} должно быть целым числом',
        negative: 'Значение {#label} должно быть отрицательным числом',
        positive: 'Значение {#label} должно быть положительным числом',
    },
    array: {
        base: 'Значение {#label} должно быть массивом',
        min: 'Значение {#label} должно содержать не менее {#limit} элементов',
        max: 'Значение {#label} должно содержать не более {#limit} элементов',
        length: 'Значение {#label} должно содержать {#limit} элементов',
    },
    object: {
        base: 'Значение {#label} должно быть объектом',
        min: 'Значение {#label} должно содержать не менее {#limit} элементов',
        max: 'Значение {#label} должно содержать не более {#limit} элементов',
        length: 'Значение {#label} должно содержать {#limit} элементов',
        regex: 'Значение {#label} не соответствует шаблону {#regex}',
    },
    boolean: {
        base: 'Значение {#label} должно быть логическим типом',
    },
    binary: {
        base: 'Значение {#label} должно быть бинарным типом',
        min: 'Значение {#label} должно быть не менее {#limit} байт',
        max: 'Значение {#label} должно быть не более {#limit} байт',
        length: 'Значение {#label} должно быть длиной {#limit} байт',
    },
    date: {
        base: 'Значение {#label} должно быть датой',
        min: 'Значение {#label} должно быть не ранее {#limit}',
        max: 'Значение {#label} должно быть не позднее {#limit}',
    },
    alternatives: {
        base: 'Значение {#label} не соответствует ни одной из альтернатив',
    },
    lazy: {
        base: 'Значение {#label} schema не может быть ленивой',
        schema: 'Значение {#label} schema должно быть функцией',
    },
    anyOf: 'Значение {#label} не соответствует ни одной из схем',
    allOf: 'Значение {#label} не соответствует ни одной из схем',
    oneOf: 'Значение {#label} не соответствует ни одной из схем',
    not: 'Значение {#label} не должно соответствовать схеме',
};

const ruJoi = Joi.extend((joi) => ({
    type: 'string',
    base: joi.string(),
    messages: flattenObject(ruMessages),
}))
    .extend((joi) => ({
        type: 'number',
        base: joi.number(),
        messages: flattenObject(ruMessages),
    }))




module.exports = ruJoi;


function flattenObject(obj, parentKey = '') {
    let result = {};

    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const nestedKeys = flattenObject(obj[key], `${parentKey}${key}.`);
            result = { ...result, ...nestedKeys };
        } else {
            const flattenedKey = `${parentKey}${key}`;
            result[flattenedKey] = obj[key];
        }
    }

    return result;
}
