import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUserRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';
import { AppError } from '../errors/AppError';




class SendMailController {


    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUserRepository = getCustomRepository(SurveysUserRepository);

        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const survey = await surveysRepository.findOne({ id: survey_id })

        if (!survey) {
            throw new AppError("Survey does not exists!");
        }



        // caminho do arquivo
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveysUserRepository.findOne({
            where: { user_id: user.id, value: null, survey_id: survey_id },
            relations: ["user", "survey"],
        })


        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }



        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath)
            return response.json(surveyUserAlreadyExists);
        }


        // Salvar as informaçoes na tabela surveyUser
        const surveyUser = surveysUserRepository.create({
            user_id: user.id,
            survey_id
        })
        await surveysUserRepository.save(surveyUser);





        // Enviar email para o usuário
        await SendMailService.execute(email, survey.title, variables, npsPath);

        variables.id = surveyUser.id;



        return response.json(surveyUser);

    }
}

export { SendMailController };

