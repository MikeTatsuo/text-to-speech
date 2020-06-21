import { getRepository } from "typeorm";
import { Texts } from "../entity";

export class TextsController {

  public static async getAllTexts(req: any, res: any) {
    const textos = await getRepository(Texts).find();

    res.send(textos);
  }

  public static async addText(req: any, res: any) {
    const data = new Texts;
    data.text = req.body.text;

    const repository = getRepository(Texts);
    const texto = await repository.save(data);

    res.send(texto);
  }
}
