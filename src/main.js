import UseCase from "./use_cases/UseCase.js";


class Main {
    async main() {
        const useCase = new UseCase();

        // await useCase.insertEmployeesFromMYSQLToMongo();
        await useCase.insertFirstsEmployeesFromMYSQLToMongo();

    }

}

new Main().main()





