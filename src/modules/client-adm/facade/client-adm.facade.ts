import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  addUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _addUsecase: UseCaseInterface;

  constructor(usecasePros: UseCaseProps) {
    this._addUsecase = usecasePros.addUsecase;
    this._findUsecase = usecasePros.findUsecase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    return await this._addUsecase.execute(input);
  }
  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUsecase.execute(input);
  }
}
