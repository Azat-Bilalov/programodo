const ProgramodoService  = require('../service/programodo.service');

class ProgramodoController {
    // ПОЛЬЗОВАТЕЛИ
    async getUsers() {
        console.log('Controller: getUser')
        return await ProgramodoService.getUsers();
    }

    async getUser(email) {
        console.log('Controller: getUser', email);
        return await ProgramodoService.getUser(email);
    }

    async createUser(user) {
        console.log('Controller: createUser', user);
        return await ProgramodoService.createUser(user);
    }

    async updateUser(user) {
        console.log('Controller: updateUser', user);
        return await ProgramodoService.updateUser(user);
    }

    async deleteUser(id) {
        console.log('Controller: deleteUser', id);
        return await ProgramodoService.deleteUser(id);
    }

    // ПРОДУКТЫ
    async getProducts() {
        console.log('Controller: getProducts');
        return await ProgramodoService.getProducts();
    }

    async getProduct(id) {
        console.log('Controller: getProduct', id);
        return await ProgramodoService.getProduct(id);
    }

    async createProduct(product) {
        console.log('Controller: createProduct', product);
        return await ProgramodoService.createProduct(product);
    }

    async updateProduct(product) {
        console.log('Controller: updateProduct', product);
        return await ProgramodoService.updateProduct(product);
    }

    async deleteProduct(id) {
        console.log('Controller: deleteProduct', id);
        return await ProgramodoService.deleteProduct(id);
    }

    async getProductsAddedByUser(userId) {
        console.log('Controller: getProductsAddedByUser', userId);
        return await ProgramodoService.getProductsAddedByUser(userId);
    }

    async getProductsFromComment(commentId) {
        console.log('Controller: getProductsFromComment', commentId);
        return await ProgramodoService.getProductsFromComment(commentId);
    }

    async addProductToUser(userId, productId) {
        console.log('Controller: addProductToUser', userId, productId);
        return await ProgramodoService.addProductToUser(userId, productId);
    }

    // КОММЕНТАРИИ
    async getComments() {
        console.log('Controller: getComments');
        return await ProgramodoService.getComments();
    }

    async getCommentsOfProduct(productId) {
        console.log('Controller: getCommentsOfProduct', productId);
        return await ProgramodoService.getCommentsOfProduct(productId);
    }

    async addComment(comment) {
        console.log('Controller: addComment', comment);
        return await ProgramodoService.addComment(comment);
    }

    async updateComment(comment) {
        console.log('Controller: updateComment', comment);
        return await ProgramodoService.updateComment(comment);
    }

    async deleteComment(id) {
        console.log('Controller: deleteComment', id);
        return await ProgramodoService.deleteComment(id);
    }

    // ЗАДАЧИ
    async getTasks() {
        console.log('Controller: getTasks');
        return await ProgramodoService.getTasks();
    }

    async getTask(id) {
        console.log('Controller: getTask', id);
        return await ProgramodoService.getTask(id);
    }

    async createTask(task) {
        console.log('Controller: createTask', task);
        return await ProgramodoService.createTask(task);
    }

    async updateTask(task) {
        console.log('Controller: updateTask', task);
        return await ProgramodoService.updateTask(task);
    }

    async deleteTask(id) {
        console.log('Controller: deleteTask', id);
        return await ProgramodoService.deleteTask(id);
    }

    async getTasksOfUser(userId) {
        console.log('Controller: getTasksOfUser', userId);
        return await ProgramodoService.getTasksOfUser(userId);
    }

    // ПРОЕКТЫ
    async getProjects() {
        console.log('Controller: getProjects');
        return await ProgramodoService.getProjects();
    }

    async getProject(id) {
        console.log('Controller: getProject', id);
        return await ProgramodoService.getProject(id);
    }

    async createProject(project) {
        console.log('Controller: createProject', project);
        return await ProgramodoService.createProject(project);
    }

    async updateProject(project) {
        console.log('Controller: updateProject', project);
        return await ProgramodoService.updateProject(project);
    }

    async deleteProject(id) {
        console.log('Controller: deleteProject', id);
        return await ProgramodoService.deleteProject(id);
    }

    // РАБОТНИКИ
    async getWorkers() {
        console.log('Controller: getWorkers');
        return await ProgramodoService.getWorkers();
    }

    async getWorker(id) {
        console.log('Controller: getWorker', id);
        return await ProgramodoService.getWorker(id);
    }

    async createWorker(worker) {
        console.log('Controller: createWorker', worker);
        return await ProgramodoService.createWorker(worker);
    }

    async updateWorker(worker) {
        console.log('Controller: updateWorker', worker);
        return await ProgramodoService.updateWorker(worker);
    }

    async deleteWorker(id) {
        console.log('Controller: deleteWorker', id);
        return await ProgramodoService.deleteWorker(id);
    }

    // КОМАНДЫ
    async getTeams() {
        console.log('Controller: getTeams');
        return await ProgramodoService.getTeams();
    }

    async getTeam(id) {
        console.log('Controller: getTeam', id);
        return await ProgramodoService.getTeam(id);
    }

    async createTeam(team) {
        console.log('Controller: createTeam', team);
        return await ProgramodoService.createTeam(team);
    }

    async updateTeam(team) {
        console.log('Controller: updateTeam', team);
        return await ProgramodoService.updateTeam(team);
    }

    async deleteTeam(id) {
        console.log('Controller: deleteTeam', id);
        return await ProgramodoService.deleteTeam(id);
    }
}
module.exports = new ProgramodoController();