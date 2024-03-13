import CarRepository, { Car } from '../database/CarRepository';

const repository = new CarRepository();

interface Response<T> {
  status: number;
  success: boolean;
  data?: T;
  error?: string;
  message: string;
}

export const getAll = async (): Promise<
  Response<{ cars: Car[] } | undefined>
> => {
  try {
    const cars = await repository.all();

    if (cars && cars.length > 0) {
      return {
        status: 200,
        success: true,
        data: {
          cars,
        },
        message: 'Dados buscados com sucesso',
      };
    } else {
      return {
        status: 404,
        success: false,
        error: 'Dados não encontrados',
        message: 'Os dados solicitados não foram encontrados no banco de dados',
      };
    }
  } catch (error) {
    return {
      status: 500,
      success: false,
      error: 'Erro interno no banco de dados',
      message: 'Erro ao buscar dados',
    };
  }
};

export const createCar = async (
  car: Car
): Promise<Response<{ response: number } | undefined>> => {
  try {
    const response = await repository.create(car);

    if (response) {
      return {
        status: 201,
        success: true,
        data: {
          response,
        },
        message: 'Registro inserido com sucesso',
      };
    } else {
      return {
        status: 400,
        success: false,
        error: 'Erro ao tentar inserir o registro',
        message:
          'O registro não pôde ser inserido por dados incorretos, ausentes, ou de alguma forma malformados',
      };
    }
  } catch (error) {
    return {
      status: 500,
      success: false,
      error: `Erro na camada de controlle. Erro: ${error}`,
      message: 'Erro ao inserir dados',
    };
  }
};
