const ProgramodoRepository  = require('../repository/programodo.repository');

class ProgramodoService {

    constructor() {}

    // ПОЛЬЗОВАТЕЛЬ
    async getUsers() {
        return await ProgramodoRepository.getUsers();
    }

    async getUser(email) {
        return await ProgramodoRepository.getUser(email);
    }

    async createUser(user) {
        return await ProgramodoRepository.createUser(user);
    }

    async updateUser(user) {
        return await ProgramodoRepository.updateUser(user);
    }

    async deleteUser(id) {
        return await ProgramodoRepository.deleteUser(id);
    }

    // ПРОДУКТЫ
    async getProducts() {
        return await ProgramodoRepository.getProducts();
    }

    async getProduct(id) {
        return await ProgramodoRepository.getProduct(id);
    }

    async createProduct(product) {
        return await ProgramodoRepository.createProduct(product);
    }

    async updateProduct(product) {
        return await ProgramodoRepository.updateProduct(product);
    }

    async deleteProduct(id) {
        return await ProgramodoRepository.deleteProduct(id);
    }

    async getProductsAddedByUser(userId) {
        return await ProgramodoRepository.getProductsAddedByUser(userId);
    }

    async getProductsFromComment(commentId) {
        return await ProgramodoRepository.getProductsFromComment(commentId);
    }

    async addProductToUser(userId, productId) {
        return await ProgramodoRepository.addProductToUser(userId, productId);
    }

    // КОММЕНТАРИИ
    async getComments() {
        return await ProgramodoRepository.getComments();
    }

    async getComment(id) {
        return await ProgramodoRepository.getComment(id);
    }

    async updateComment(comment) {
        return await ProgramodoRepository.updateComment(comment);
    }

    async deleteComment(id) {
        return await ProgramodoRepository.deleteComment(id);
    }

    async getCommentsOfProduct(productId) {
        return await ProgramodoRepository.getCommentsOfProduct(productId);
    }

    async addComment(comment) {
        return await ProgramodoRepository.addComment(comment);
    }

    // ЗАДАЧИ
    async getTasks() {
        return await ProgramodoRepository.getTasks();
    }

    async getTask(id) {
        return await ProgramodoRepository.getTask(id);
    }

    async createTask(task) {
        return await ProgramodoRepository.createTask(task);
    }

    async updateTask(task) {
        return await ProgramodoRepository.updateTask(task);
    }

    async deleteTask(id) {
        return await ProgramodoRepository.deleteTask(id);
    }

    // ПРОЕКТЫ
    async getProjects() {
        return await ProgramodoRepository.getProjects();
    }

    async getProject(id) {
        return await ProgramodoRepository.getProject(id);
    }

    async createProject(project) {
        return await ProgramodoRepository.createProject(project);
    }

    async updateProject(project) {
        return await ProgramodoRepository.updateProject(project);
    }

    async deleteProject(id) {
        return await ProgramodoRepository.deleteProject(id);
    }

    // РАБОТНИКИ
    async getWorkers() {
        return await ProgramodoRepository.getWorkers();
    }

    async getWorker(id) {
        return await ProgramodoRepository.getWorker(id);
    }

    async createWorker(worker) {
        return await ProgramodoRepository.createWorker(worker);
    }

    async updateWorker(worker) {
        return await ProgramodoRepository.updateWorker(worker);
    }

    async deleteWorker(id) {
        return await ProgramodoRepository.deleteWorker(id);
    }

    // КОМАНДЫ
    async getTeams() {
        return await ProgramodoRepository.getTeams();
    }

    async getTeam(id) {
        return await ProgramodoRepository.getTeam(id);
    }

    async createTeam(team) {
        return await ProgramodoRepository.createTeam(team);
    }

    async updateTeam(team) {
        return await ProgramodoRepository.updateTeam(team);
    }

    async deleteTeam(id) {
        return await ProgramodoRepository.deleteTeam(id);
    }
}

module.exports = new ProgramodoService();