// из названий столбцов таблицы в русские названия
const fieldNames = {
    id: 'ID',
    name: 'Название',
    email: 'Email',
    password: 'Пароль',
    login: 'Логин',
    contacts: 'Контакты',
    post: 'Должность',
    experience: 'Опыт',
    direction: 'Направление',
    project: 'Проект',
    product: 'Продукт',
    worker: 'Работник',
    team: 'Команда',
    created_at: 'Дата создания'
};

const errorHandler = (err) => {
    let field, fields, table;
    
    switch (err.code) {
        case '23505':
            field = err.detail.match(/\((.*?)\)/)[1];
            table = err.detail.match(/"(.*?)"/)[1];
            throw {
                message: `${fieldNames[field]} уже существует`,
                status: 400
            }
        case '23503':
            field = err.detail.match(/\((.*?)\)/)[1];
            throw {
                message: `${fieldNames[field]} не найден`,
                status: 404
            }
        case '23502':
            fields = err.detail.match(/\((.*?)\)/g).map(field => field.match(/\((.*?)\)/)[1]);
            throw {
                message: `Не все поля заполнены: ${fields.map(field => fieldNames[field]).join(', ')}`,
                status: 400
            }
        default:
            throw {
                message: err.message,
                status: 400
            }
    }
}

module.exports = errorHandler;
