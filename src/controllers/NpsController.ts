import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUsersRepository";
import { Request, Response } from 'express';



class NpsController {

    async execute(request: Request, response: Response) {

        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUserRepository);

        // Presquisar as respostas referente a pesquisa
        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        // Filtrando os detratores (nota de 0-6)
        const detractor = surveysUsers.filter(survey =>
            (survey.value >= 0 && survey.value <= 6)
        ).length;

        // Filtrando os promotores (nota 9-10)
        const promoters = surveysUsers.filter(survey => 
            survey.value >= 9 && survey.value <= 10
        ).length;

        // Filtrando os passivos (ignorados no calculo de nps)
        const passive = surveysUsers.filter(survey => 
            survey.value >= 7 && survey.value <= 8
        ).length;

        // Total de respostas
        const totalAnswers = surveysUsers.length;

        // Calcular o NPS
        const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate,
        })

    }
}

export { NpsController };
